
function login(){
	var loginObj = signObject({
		path:"login"					
	});
	
	sendsignedObjectToServer(login).then(console.log).catch(console.log);
}

function createWallet(){
	//TODO: Gather Entropy
	var wallet = web3.eth.accounts.wallet.create(1,web3.utils.randomHex(32));// [, entropy]);

	console.log("created address: " +wallet[0].address);
	do{
	var pw = prompt("Please enter a password");
	var verify = prompt("Please verify password");
	}while(pw!= verify);
	
	web3.eth.accounts.wallet.save(pw );
	return wallet;
}
function loadWallet(){
	//load from localstorage
	var pw = prompt("Please enter your password");
	web3.eth.accounts.wallet.load(pw);
}
function forgetWallet(){
	//delete from localstorage
	web3.eth.accounts.wallet.clear();
}
function recoverWallet(){
	var pw = prompt("Please enter your password");				
	var keystoreArray = prompt("Please enter your recovery key");
	
	//get seeds and load acct
	web3.eth.accounts.wallet.decrypt(keystoreArray, pw);
	web3.eth.accounts.wallet.save(pw );
}
function backupWallet(){
	var pw = prompt("Please enter your password");	
	var backup = web3.eth.accounts.wallet.encrypt(pw);
	console.log(backup);
	//TODO: save backup
}

function signObject(obj){
	return web3.eth.accounts.wallet[0].sign(obj);
}
function verifyObject(signedObject){
	var sender = web3.eth.accounts.recover(signedObject);
	//TODO: verify the object itself
	return sender;
}

function sendsignedObjectToServer(signedObject){
	//get challenge from server
	//could be sent/embedded with js or loaded with page
	var serverChallenge = web3.utils.randomHex(32);	

	console.log("verified signer: "+verifyObject(signedObject));
	
	var toServer = {
		signedObject:signedObject,
		serverChallenge:serverChallenge
	};
	
	return new Promise((res,rej)=>{
		//TODO ajax
		return res(toServer);
		
	});
}
