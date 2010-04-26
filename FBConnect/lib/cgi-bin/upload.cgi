#!/usr/bin/perl -w

# Where is the upload file going?
my $Upload_Dir = '/tmp'; 

### That's all for user-serviceable parts.

$|++; 

use strict; 
use CGI::Carp qw(fatalsToBrowser); 
use CGI; 
#use CGI::Ajax;

#my $pjx = new CGI::Ajax('check_status' => \&check_status);
my $q   = CGI->new(\&hook);


        print $q->header(); 



sub hook {
            
    my ($filename, $buffer, $bytes_read, $data) = @_;
    
    $bytes_read ||= 0; 
          
    open(COUNTER, ">" . $Upload_Dir . '/' . $filename . '-meta.txt'); 
    
    my $per = 0; 
    if($ENV{CONTENT_LENGTH} >  0){ # This *should* stop us from dividing by 0, right?
        $per = int(($bytes_read * 100) / $ENV{CONTENT_LENGTH});
    }
    print COUNTER $per;
    close(COUNTER); 
     
}

main(); 

sub main { 


 
        if($q->param('upload')) { 
            upload_that_file($q); 
        }
	if($q->param('check')){
	    check_status();
	}
	if($q->param('dump')){
	    dump_meta_file();
	}else{
	}
}


sub upload_that_file() { 

    my $q = shift; 
    
    my $fh       = $q->upload('uploadedfile');
    my $filename = $q->param('uploadedfile');
	my $rand_str = $q->param('rand_string');
	
    return '' if ! $filename; 
    
    my $outfile = $Upload_Dir . '/' . $rand_str . '-' . $q->param('uploadedfile');
    
    open (OUTFILE, '>' . $outfile) 
        or die("can't write to " . $outfile . ": $!");        
    
    while (my $bytesread = read($fh, my $buffer, 1024)) { 
        print OUTFILE $buffer; 
    } 
    
    close (OUTFILE);
    chmod(0666, $outfile);  
    
    open(COUNTER, ">" . $Upload_Dir . '/'. $filename . '-meta.txt'); 
    print COUNTER "100";
    close(COUNTER); 
    
    
}


sub check_status { 
   
   my $filename = $q->param('filename');   #$q->param('uploadedfile');
    return '' 
        if ! -f  $Upload_Dir . '/' . $filename . '-meta.txt'; 
        
    open my $META, '<', $Upload_Dir . '/' . $filename  . '-meta.txt' or die $!;
    my $s = do { local $/; <$META> };
    close ($META); 
    
    print $s;    
}


sub dump_meta_file { 
   my $filename = $q->param('uploadedfile');
      $filename =~ s{^(.*)\/}{}; 
    unlink($Upload_Dir . '/' . $filename . '-meta.txt') or warn "deleting meta file didn't work..."; 
}
