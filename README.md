This is a Wiki like DOOR Application for Synchronet BBS

#### Install ####

Export the files into the "xtrn" directory of sbbs.

```
#!bash

cd sbbs/xtrn
git clone https://bitbucket.org/andpeters/dxcluster-door-app.git dxcluster

exec/scfg

```

Create a "External Command"

*   Name                       DX Cluster                     
*   Internal Code              DXCLUSTER                    
*   Start-up Directory         ../xtrn/dxcluster      
*   Command Line               ?dxcluster.js          
*   Clean-up Command Line                              
*   Execution Cost             None                    
*   Access Requirements                                
*   Execution Requirements                             
*   Multiple Concurrent Users  Yes                     
*   Intercept I/O              No                      
*   Native Executable          No                      
*   Use Shell to Execute       No                      
*   Modify User Data           No                      
*   Execute on Event           Logon                   
*   Pause After Execution      No                      
*   BBS Drop File Type         None                    
*   Place Drop File In         Node Directory  

#### Configuraton ####

```
cronjob -e
*/1 * * * * /home/andreas/development/sbbs/sbbs/xtrn/dxcluster/spot.sh
```


#### Credits ####

*   Development: Andreas - (https://www.andreas-peters.net/ "www.andreas-peters.net")
*   Lizense: GPL
