#!/usr/bin/expect
set hello "world"
set NAME "deployment"
set PASSWORD "8PWyulzRKrkg2yD"
set EMAIL "daicheng@zailingtech.com"
set timeout 10
spawn  npm login https://nexus.yun-ti.com/
expect {
    "Username*" { send "${NAME}\r"; exp_continue  }
    "Password*" { send "${PASSWORD}\r"; exp_continue  }
    "Email*" { send "${EMAIL}\r" }
}
expect eof { exit }
