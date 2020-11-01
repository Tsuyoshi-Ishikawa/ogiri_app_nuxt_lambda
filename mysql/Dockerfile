#使うDockerイメージ
FROM mysql

#ポートを開ける
EXPOSE 3307

RUN touch /tmp/mysql.sock
#MySQL設定ファイルをイメージ内にコピー
ADD ./my.cnf /etc/mysql/conf.d/my.cnf

#docker runに実行される
CMD ["mysqld"]