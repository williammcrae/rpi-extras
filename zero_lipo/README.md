Zero LiPo shutdown Support
==

This readme file, script and cron file are based on a part of:
* https://github.com/NeonHorizon/lipopi

###Software
1. Created the working directory
```
mkdir /home/pi/zero_lipo
```

2. Install the low battery shutdown script.
```
cd /home/pi/zero_lipo
wget https://raw.githubusercontent.com/williammcrae/rpi-extras/master/zero_lipo/low_bat_shutdown
chmod +x low_bat_shutdown
```

3. Execute this script by typing /home/pi/zero_lipo/low_bat_shutdown nothing should happen. If the Pi shuts down then  the battery is low or the Zero LiPo hardware or install has a problem.

4. Install the cron task.
```
cd /etc/cron.d
sudo wget https://raw.githubusercontent.com/williammcrae/rpi-extras/master/zero_lipo/power_check
```

5. You "should" now be able to leave your RPI running and when the Zero LiPo reports a low battery then it will log a message and shutdown.
