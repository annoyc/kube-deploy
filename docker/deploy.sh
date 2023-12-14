#!/usr/bin/expect
set DEPLOY_IMAGE                   [lindex $argv 0]
set SERVER_PORT                    [lindex $argv 1]  
set SERVER_PORT2                   [lindex $argv 2]
set SERVICE_NAME                   [lindex $argv 3]
set CI_JOB_TOKEN                   [lindex $argv 4]
set DEPLOY_JUMPER_PWD              [lindex $argv 5]
set DEPLOY_ADDR                    [lindex $argv 6]
set RUN_ENV                        [lindex $argv 7]
#超时时间设置长点，20分钟，完成部署任务会退出
set timeout 1200
set jumpserver 122.112.249.242
set port 22
set username qianshihua
spawn ssh -p $port $username@$jumpserver
expect {
    "*yes/no)?" { send "yes\r"; exp_continue  }
    "*assword:" { send "$DEPLOY_JUMPER_PWD\r"; exp_continue  }
    "Opt or ID*" { send "$DEPLOY_ADDR\r" }
}

expect {
    "ID>*" { send "1\r" }
    "web@" {send "\r"}
}

expect {
   "web@" {
        send "sudo docker login -u gitlab-ci-token -p $CI_JOB_TOKEN registry.yun-ti.com\r"
        send "sudo docker pull $DEPLOY_IMAGE\r"
        send "sudo docker rm -f $SERVICE_NAME\r"
        send "sudo docker run -d --restart=always -p $SERVER_PORT:80 -e RUN_ENV=$RUN_ENV --name=$SERVICE_NAME $DEPLOY_IMAGE\r"
        send "exit\r"
    }
}

expect {
    "Opt or ID*" { send "q\r" }
}
