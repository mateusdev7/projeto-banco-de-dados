<h1>Passo a passo</h1>
<ol>
  <li>Instalar o WAMP ou XAMP - Entrar no link abaixo para realizar a instalação</li>
  <a href="https://blog.templatetoaster.com/how-to-install-wamp/">Clique aqui e siga o passo a passo</a>
  <li>Baixar ou clonar o projeto</li>
  <p>Ao baixar o projeto, tirar todos os arquivos da pasta e colocar na pasta raiz HTDOCS que está dentro da pasta APACHE do seu disco</p>
  <li>Rode os comandos - pip install mysqlclient, pip install mysql-connector-python, pip install pymysql</li>
  <br>
  <p>Após fazer as instalações acima, vá na pasta ./service que está no projeto e dê play nos 3 servidores disponíveis, eles irão executar as API's 
  para que elas funcionem e recebam os dados. Se possível, faça isso em 3 CMDS ou PowerShell diferentes.</p>
  <p>Para rodar o comando pelo cmd, vá para a raiz do projeto e execute de forma separada em 3 cmd's diferentes os comandos: </p>
  <h4>python ProfessionService.py</h4>
  <h4>python UserProfession.py</h4>
  <h4>python UsersService.py</h4>
</ol>
<p>Com isso, os servidores vão estar no Ar e todos os processos estaram funcionando.</p>

