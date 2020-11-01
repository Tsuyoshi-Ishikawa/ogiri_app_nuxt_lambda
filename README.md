## 構成
nuxt
lambda
RDS

で構成しようとした。
開発では、RDSは使用せずmysqlコンテナを使って行おうとしたが、lambdaから繋げなかった。RDSにバッションを通して繋ごうともしたがそれもうまくいかなかったので、今回この開発を諦める

## 環境
nuxtとmysqlはdocker-composeで作成した。
lambdaはaws-samを使用してlocalで使用できるようにした

## 環境設定
- vagrantのライブラリをいれる
vagrant plugin install vagrant-docker-compose
vagrant plugin install vagrant-mutagen
vagrant plugin install vagrant-disksize
vagrant plugin install vagrant-vbguest

- vagrantを立ち上げる
vagrant up
vagrant ssh

- gopath設定
echo export PATH=$PATH:/usr/local/go/bin >> ~/.bashrc 
echo export GOPATH=$HOME/go >> ~/.bashrc
source ~/.bashrc

- goのormインストール
go get -u github.com/jinzhu/gorm

- docker立ち上げ
cd /home/vagrant/ogiri
docker-compose up -d

- sam立ち上げ
cd sam-app/
sam build
sam local start-api --host 192.168.50.10 --docker-network ogiri_ogiri-network 