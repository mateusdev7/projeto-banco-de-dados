<h1>Requisitos iniciais</h1>
<p>Instalar o WAMP ou XAMP - Entrar no link abaixo para realizar a instalação</p>
<a href="https://blog.templatetoaster.com/how-to-install-wamp/">Clique aqui e siga o passo a passo</a>
<p>Baixar ou clonar o projeto</p>
<p>Ao baixar o projeto, altere o "sys.path.append" para a localização que você colocou no seu computador. Como os arquivos devem estar sempre dentro da pasta Apache24/htdocs, basta alterar, se necessário, o final do caminho.</p>
<img style="max-width: 100%" src="https://imgur.com/EHnDHJy.jpg"/>
<h3>Instale a dependência necessária com o comando abaixo:</h3>
<p>pip install pymongo</p>
<h1>Baixando MongoDBCompass</h1>
<p>Após fazer todos esses processos, baixe o MongoDBCompass por <a href="https://www.mongodb.com/try/download/shell">aqui</a></p>
<p>Entre no programa, crie uma data base com o nome de "beautysalon" e dentro dela crie 3 coleções com os nomes de "profession", "userProfession" e "users"</p>
<h1>Iniciando os servidores</h1>
<p>Após fazer os processos acima, vá na pasta ./service que está no projeto e inicie os 3 servidores disponíveis, eles irão executar as API's 
para que elas funcionem e recebam os dados. Se possível, faça isso em 3 CMDS ou PowerShell diferentes.</p>
<p>Comandos: </p>
<h4>python ProfessionService.py</h4>
<img style="max-width: 100%" src="https://imgur.com/lFLpzV4.jpg"/>
<h4>python UserProfession.py</h4>
<img style="max-width: 100%" src="https://imgur.com/tcpdKpn.jpg"/>
<h4>python UsersService.py</h4>
<img style="max-width: 100%" src="https://imgur.com/UfKCnUM.jpg"/>
<h1>Passo final</h1>
<p>Abra o menu.html com o live server e utilize o sistema</p>



