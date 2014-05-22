<?php

if(isset($_POST['enviar'])){
       //Inclui as classes do PHPMailer
// require_once 'C:\xampp\htdocs\grupoteccenter.com.br/lib/PHPMailer_5.2.2/class.phpmailer.php';
// require_once 'C:\xampp\htdocs\grupoteccenter.com.br/lib/PHPMailer_5.2.2/class.smtp.php';

 require_once 'lib/PHPMailer_5.2.2/class.phpmailer.php';
 require_once 'lib/PHPMailer_5.2.2/class.smtp.php';

 // Instancia o objeto $mail a partir da Classe PHPMailer
 $mail = new PHPMailer();

 // Recupera os dados do formulário
 $nome       = $_POST['nome'];
 $email      = $_POST['email'];
 $fone      = $_POST['fone'];
 $menssagem  = $_POST['menssagem'];

 // Monta a mensagem que sera enviada
 $corpo = "<strong>Nome:</strong> $nome<br /><strong>E-mail:</strong> $email<br /><strong>Telefone:</strong> $fone<br><strong>Mensagem:</strong><br /><br />$menssagem";

 //Aqui é informado todos os dados necessário para autenticar o envio
 //$mail->Host = '201.73.104.2';
 $mail->Host = "192.168.10.230"; 
 $mail->IsSMTP();
 $mail->SMTPAuth = true;
 $mail->Port = 25;
 $mail->Username = 'contato@tisstech.com.br';
 $mail->Password = 'xpto@123';

 $mail->From = $email;
 $mail->FromName = $nome;

 $mail->Subject = 'Assunto da mensagem';
        //e-mail destinatário
 $mail->AddAddress('contato@tisstech.com.br');

 // Informa que a mensagem deve ser enviada em HTML
 $mail->IsHTML(true);
 // Informa o corpo da mensagem
 $mail->Body = $corpo;
 // Tenta enviar o e-mail e analisa o resultado
 if ($mail->Send()) {
     echo "<script type='text/javascript'> alert('Contato Enviado com Sucesso!'); window.location.href='./index.html'; </script>";
 }
 else {
     echo "<script type='text/javascript'> alert('Erro ao enviar o email, por favor tente novamente!'); window.location.href='./index.html'; </script>";
 }

}

?>