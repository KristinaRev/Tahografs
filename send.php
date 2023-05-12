<?
if(isset($_POST['name']) && !empty($_POST['name']) && isset($_POST['phone']) && !empty($_POST['phone'])) {
	$name = trim(htmlspecialchars($_POST['name']));
	$phone = trim(htmlspecialchars($_POST['phone']));
	$msg = "Name: $name Phone number: $phone";
	if (mail("e.polikarpova@sotrans.ru,espolikarpova@yandex.ru", "Message from tacho.sotrans.ru", $msg ,"From: tacho@sotrans.ru \r\n"))
		echo "Cообщение успешно отправлено";
	else
		echo "При отправке сообщения возникли ошибки";
} else
echo "При отправке сообщения возникли ошибки";
?>