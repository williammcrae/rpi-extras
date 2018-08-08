https://www.tunnelsup.com/raspberry-pi-phoning-home-using-a-reverse-remote-ssh-tunnel/
https://askubuntu.com/questions/48129/how-to-create-a-restricted-ssh-user-for-port-forwarding

sudo useradd -m limited-user

edit /etc/ssh/sshd_config

Match User limited-user
   #AllowTcpForwarding yes
   #X11Forwarding no
   #PermitTunnel no
   #GatewayPorts no
   AllowAgentForwarding no
   PermitOpen localhost:any
   ForceCommand echo 'This account can only be used for [reason]'
