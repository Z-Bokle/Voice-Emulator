const NodeEmail = require('nodemailer');

let transporter = NodeEmail.createTransport({
	host: 'smtp.163.com',
	port: 465,
	secureConnection: true,
	auth: {
		user: "VoiceEmulator@163.com", //替换成发送验证码专用邮箱
		pass: "OPFFBEBIUYHCDQAL" //该测试码仅用于测试邮件，不可公开
	}
});

function send(email,code) {

	let mailobj = {
		from: '"Voice Emulator" <VoiceEmulator@163.com>',
		to: email, // 接收验证码的邮箱
		subject: "Voice Emulator 邮箱注册验证码", // 主题
		text: `您的验证码是${code}，有效期5分钟` // 正文
	};

	return new Promise((resolve, reject) => {
		transporter.sendMail(mailobj, (err, data) => {
			if (err) reject();
			else resolve();
		});
	});
}


module.exports = { send }; //将send函数开放给外部使用