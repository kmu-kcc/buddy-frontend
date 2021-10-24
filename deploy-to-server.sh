#!/bin/bash
scp -i ../../../../cert/oci/buddy-instance.key -r ~/projects/kmu/kcc/projects/buddy-frontend/build ubuntu@146.56.190.179:/home/ubuntu/buddy-frontend
