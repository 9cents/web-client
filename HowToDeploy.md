# How to Deploy into the VM

1. Ensure you have a `.env` file with contents
   ```
   REACT_APP_API=http://172.21.148.168:5001
   ```
2. Run `npm run build`. Files will be generated at `build/` directory.
3. Copy files over to the VM using whichever method (SCP, RSYNC, SFTP, etc)
   Example:
   ```
   rsync [options] SRC USER@HOST:DEST
   rsync --progress -avh build/* VMadmin@172.21.148.168:~/Downloads/temp/
   ```
4. SSH into the VM
   ```
   ssh VMadmin@172.21.148.168
   ```
5. Inside the VM, you will need to install Nginx.
   [Digital Ocean Tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04) covers how to install and how to configure the firewall to allow access.
6. Once Nginx is installed, change the configuration at `/etc/nginx/sites-available/default`. <br>
   Use your favourite editor to edit it (Vi/Vim/Nano).
   ```
   sudo nano /etc/nginx/sites-available/default
   ```
7. Move the files you transfered in step 3 into the target destionation that you configured in step 6 inside the config file.
   For example:
   ```
   sudo mv ~/Downloads/temp/* /var/www/webapp/
   ```
8. Restart Nginx service to reflect the changes
   ```
   sudo systemctl restart nginx
   ```