# frozen_string_literal: true

#参考資料 https://qiita.com/necocoa/items/bd62ed3dba14b17552f2

#samが使えるようにするためのscript
script = <<~SCRIPT
  apt-get update
  apt-get -y upgrade
  apt-get install bash
  apt-get install git
  apt-get install gcc make
  cd ../../
  sudo wget https://dl.google.com/go/go1.14.7.linux-amd64.tar.gz
  sudo tar -C /usr/local -xzf go1.14.7.linux-amd64.tar.gz
  sudo wget https://www.python.org/ftp/python/3.7.0/Python-3.7.0.tar.xz
  sudo tar xvf Python-3.7.0.tar.xz
  cd Python-3.7.0
  sudo ./configure
  sudo make altinstall
  sudo update-alternatives --install /usr/bin/python python /usr/local/bin/python3.7 1
  sudo update-alternatives --config python
  cd
  sudo apt-get -y install python3-pip python3-dev
  pip3 install awscli
  pip3 install aws-sam-cli
SCRIPT

Vagrant.configure('2') do |config|
  config.vm.box = 'bento/ubuntu-18.04'

  config.vm.hostname = 'ogiri'

  config.vm.network :private_network, ip: '192.168.50.10'
  #これでport_forwardigをしている、hostに8080できたものをVMの8080に投げている
  config.vm.network :forwarded_port, host: 8080, guest: 8080
  config.vm.network :forwarded_port, host: 3307, guest: 3307
  config.vm.network :forwarded_port, host: 3000, guest: 3000

  #VMのスペックの設定
  config.vm.provider :virtualbox do |vb|
    vb.gui = false
    vb.cpus = 2
    vb.memory = 2048
    # dns処理をホスト側で行わない設定？https://www.miyazakisato.ru/archives/734
    vb.customize ['modifyvm', :id, '--natdnsproxy1', 'off']
    vb.customize ['modifyvm', :id, '--natdnshostresolver1', 'off']
  end

  config.disksize.size = '30GB'
  #マウントの設定を書くまえにmutagenを使ってちゃんとマウントするようにしないといけない?
  #https://qiita.com/necocoa/items/bd62ed3dba14b17552f2
  config.mutagen.orchestrate = true
  #マウントする設定、typeは共有ファイルの形(あまり気にしないで良いかも)
  #rsyncは同期する時の処理の設定
  #https://www.vagrantup.com/docs/synced-folders/basic_usage
  #https://www.vagrantup.com/docs/synced-folders/rsync
  config.vm.synced_folder './', '/home/vagrant/ogiri/',
                          type: 'virtualbox',
                          rsync_auto: true,
                          rsync__exclude: ['.git/', 'node_modules/', 'log/', 'tmp/']


  #vagrant upした時に発動する内容
  config.vm.provision :docker, run: 'always'
  config.vm.provision :docker_compose
  #shellでshを実行
  config.vm.provision :shell, inline: script
end