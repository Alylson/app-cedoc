drop table if exists liv_timeline;

create table liv_timeline(
				n_pktipo int not null,
				n_pkent int not null
			);
			
drop table if exists liv_noticia;

create table liv_noticia(
				n_pknoticia int not null auto_increment,
				c_titulo varchar(255),
				c_autor varchar(70),
				c_texto text,
				n_datapost varchar(255) not null,
				n_curtidas int,
				c_thumbnail varchar(200),
				primary key (n_pknoticia)
			);
            
drop table if exists liv_ent;
			
create table liv_ent(
				n_pkent int not null auto_increment,
				n_pktipo int not null,
				c_nome varchar(50) not null,
				c_autor varchar(70),
				d_publi date,
				n_datapost varchar(255) not null,
				c_info varchar(255),
				c_displocal varchar(5) not null,
				c_dispebook varchar(5) not null,
				c_linkdown text,
				n_curtidas int,
				c_thumbnail varchar(200),
				c_categoria varchar(255),
				primary key (n_pkent)
			);
			
drop table if exists liv_catego;

create table liv_catego(
				n_pkcatego int not null auto_increment,
				c_nomecatego varchar(100) not null,
                c_thumbnail varchar(200),
				primary key (n_pkcatego)
			);
            
drop table if exists liv_coment;

create table liv_coment(
				n_pkcoment int not null auto_increment,
				c_coment text not null,
				c_thumbnail varchar(200),
				primary key (n_pkcoment)
			);
			
drop table if exists liv_usuario;

create table liv_usuario(
				n_pkid int not null auto_increment,
				c_nome varchar(255) not null,
				c_email varchar(255) not null,
				c_senha varchar(255) not null,
				primary key (n_pkid)
			);
			
insert into liv_usuario(c_nome, c_email, c_senha) values('Pedro Gonçalves', 'admin', 'admin');
			
insert into liv_timeline(n_pktipo, n_pkent) values(1,1);

insert into liv_timeline(n_pktipo, n_pkent) values(2,1);

insert into liv_timeline(n_pktipo, n_pkent) values(1,2);

insert into liv_timeline(n_pktipo, n_pkent) values(2,2);

insert into liv_timeline(n_pktipo, n_pkent) values(2,3);

insert into liv_timeline(n_pktipo, n_pkent) values(2,4);

insert into liv_noticia(c_titulo, c_autor, c_texto, n_datapost, n_curtidas, c_thumbnail)
	values(	"UnB não vê mudanças com o Bilhete Único",
			"Allan Michael",
			"Usuários que dependem da integração para a chegada na Universidade se dizem surpresos e confusos com a “novidade” ",
			1512070752344,
			0,
			"http://campus.fac.unb.br/wp-content/uploads/2017/10/WhatsApp-Image-2017-10-19-at-18.46.39-800x445.jpeg");
			
insert into liv_ent(n_pktipo, c_nome, c_autor, d_publi, n_datapost, c_info, c_displocal, c_dispebook, c_linkdown, n_curtidas, c_thumbnail, c_categoria)
	values(	1,
			"C Livro",
			"John Smith",
			STR_TO_DATE( "27/01/1970", "%d/%m/%Y" ),
			1512070752344,
			"Pellentesque quis cursus sapien. Cras ut auctor tortor. Proin odio lectus, consectetur non ultricies vitae, lac ",
			"true",
			"false",
			null,
			0,
			"https://images.pexels.com/photos/256396/pexels-photo-256396.jpeg?h=350&auto=compress&cs=tinysrgb",
			"1,2");
			
insert into liv_noticia(c_titulo, c_autor, c_texto, n_datapost, n_curtidas, c_thumbnail)
	values(	"Ex-donos acreditam que estudantes ou curso de Veterinária tomarão conta de gatos na UnB",
			"Tayanne Silva",
			"Animais pagam o preço da incoerência humana e ficam em um cenário cheio de perigos ",
			1512070752344,
			0,
			"http://campus.fac.unb.br/wp-content/uploads/2017/11/22279193_1099834913480613_887248987_o-800x445.jpg");
			
insert into liv_ent(n_pktipo, c_nome, c_autor, d_publi, n_datapost, c_info, c_displocal, c_dispebook, c_linkdown, n_curtidas, c_thumbnail, c_categoria)
	values(	1,
			"A Outro Livro",
			"John Smith",
			STR_TO_DATE( "28/01/1970", "%d/%m/%Y" ),
			1512509049697,
			"Pellentesque quis cursus sapien. Cras ut auctor tortor. Proin odio lectus, consectetur non ultricies vitae, lac ",
			"false",
			"true",
			"",
			0,
			"https://images.pexels.com/photos/256396/pexels-photo-256396.jpeg?h=350&auto=compress&cs=tinysrgb",
			"2,3");
			
insert into liv_ent(n_pktipo, c_nome, c_autor, d_publi, n_datapost, c_info, c_displocal, c_dispebook, c_linkdown, n_curtidas, c_thumbnail, c_categoria)
	values(	1,
			"B Terceiro Livro",
			"John Smith",
			STR_TO_DATE( "27/01/2017", "%d/%m/%Y" ),
			1512509048234,
			"Pellentesque quis cursus sapien. Cras ut auctor tortor. Proin odio lectus, consectetur non ultricies vitae, lac ",
			"false",
			"true",
			"",
			0,
			"https://images.pexels.com/photos/256396/pexels-photo-256396.jpeg?h=350&auto=compress&cs=tinysrgb",
			"4,2");

insert into liv_ent(n_pktipo, c_nome, c_autor, d_publi, n_datapost, c_info, c_displocal, c_dispebook, c_linkdown, n_curtidas, c_thumbnail, c_categoria)
	values(	1,
			"E Terceiro Livro",
			"John Castle",
			STR_TO_DATE( "27/01/2018", "%d/%m/%Y" ),
			1512509050337,
			"Pellentesque quis cursus sapien. Cras ut auctor tortor. Proin odio lectus, consectetur non ultricies vitae, lac ",
			"true",
			"true",
			"",
			0,
			"https://images.pexels.com/photos/256396/pexels-photo-256396.jpeg?h=350&auto=compress&cs=tinysrgb",
			"5,3,2");
			
insert into liv_ent(n_pktipo, c_nome, c_autor, d_publi, n_datapost, c_info, c_displocal, c_dispebook, c_linkdown, n_curtidas, c_thumbnail, c_categoria)
	values(	1,
			"E Terceiro Livro",
			"John Castle",
			STR_TO_DATE( "27/01/2018", "%d/%m/%Y" ),
			1512509050337,
			"Pellentesque quis cursus sapien. Cras ut auctor tortor. Proin odio lectus, consectetur non ultricies vitae, lac ",
			"true",
			"false",
			"",
			0,
			"https://images.pexels.com/photos/256396/pexels-photo-256396.jpeg?h=350&auto=compress&cs=tinysrgb",
			"5,3,2");
			
insert into liv_catego(c_nomecatego, c_thumbnail)
	values(	"Ciência",
			"https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?h=350&auto=compress&cs=tinysrgb");

insert into liv_catego(c_nomecatego, c_thumbnail)
	values(	"Tecnologia",
			"https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?h=350&auto=compress&cs=tinysrgb");
			
insert into liv_catego(c_nomecatego, c_thumbnail)
	values(	"Matemática",
			"https://images.pexels.com/photos/74228/night-theme-numbers-black-and-white-pen-74228.jpeg?h=350&auto=compress&cs=tinysrgb");
			
insert into liv_catego(c_nomecatego, c_thumbnail)
	values(	"Biografia ",
			"https://images.pexels.com/photos/33283/stack-of-books-vintage-books-book-books.jpg?h=350&auto=compress&cs=tinysrgb");
			
insert into liv_catego(c_nomecatego, c_thumbnail)
	values(	"Autobiografia ",
			"https://images.pexels.com/photos/207732/pexels-photo-207732.jpeg?h=350&auto=compress&cs=tinysrgb");
			
insert into liv_catego(c_nomecatego, c_thumbnail)
	values(	"Auto-ajuda",
			"https://images.pexels.com/photos/18178/selfie-portrait-picture-photo.jpg?h=350&auto=compress&cs=tinysrgb");
			
insert into liv_catego(c_nomecatego, c_thumbnail)
	values(	"Saúde",
			"https://images.pexels.com/photos/68525/soap-colorful-color-fruit-68525.jpeg?h=350&auto=compress&cs=tinysrgb");

insert into liv_catego(c_nomecatego, c_thumbnail)
	values(	"Guia",
			"https://images.pexels.com/photos/297755/pexels-photo-297755.jpeg?h=350&auto=compress&cs=tinysrgb");
			
insert into liv_catego(c_nomecatego, c_thumbnail)
	values(	"Poesia",
			"https://images.pexels.com/photos/448835/pexels-photo-448835.jpeg?h=350&auto=compress&cs=tinysrgb");

insert into liv_catego(c_nomecatego, c_thumbnail)
	values(	"Enciclopédia",
			"https://images.pexels.com/photos/47805/library-book-reading-computers-47805.jpeg?h=350&auto=compress&cs=tinysrgb");
			
insert into liv_catego(c_nomecatego, c_thumbnail)
	values(	"Dicionário",
			"https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?h=350&auto=compress&cs=tinysrgb");

commit;