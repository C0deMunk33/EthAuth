//TODO: make this available for multiple 
module.exports = {
	login: (serverAddr)=>{
		var loginObj = signObject({
			path:"login"					
		});
		
		sendsignedObjectToServer(login,serverAddr)
		.then(console.log)
		.catch(console.log);
	},
	createWallet:(pw)=>{
		//TODO: Gather Entropy
		console.log(web3.eth.accounts);
		var wallet = web3.eth.accounts.wallet.create(1,web3.utils.randomHex(32));// [, entropy]);

		console.log("created address: " +wallet[0].address);
		
		saveWallet(pw);
		return wallet;
	},
	loadWallet:(pw)=>{
		web3.eth.accounts.wallet.load(pw);
	},
	forgetWallet:()=>{
		//delete from localstorage
		web3.eth.accounts.wallet.clear();
	},
	recoverWallet:(pw,keystoreArray)=>{		
		//get seeds and load acct
		web3.eth.accounts.wallet.decrypt(keystoreArray, pw);
		
		saveWallet(pw);
	},
	backupWallet:(pw)=>{
		
		var backup = web3.eth.accounts.wallet.encrypt(pw);
		console.log(backup);
		//TODO: save backup
	},
	signObject:(obj)=>{
		return web3.eth.accounts.wallet[0].sign(obj);
	},
	verifyObject:(signedObject)=>{
		var sender = web3.eth.accounts.recover(signedObject);
		//TODO: verify the object itself
		return sender;
	},
	sendsignedObject:(signedObject, sendTo)=>{
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
};

function saveWallet(pw){
	if(typeof window !== 'undefined') {
		
		web3.eth.accounts.wallet.save(pw);
	}
	else{
		//TODO: Save Locally
		var backup = web3.eth.accounts.wallet.encrypt(pw);
		console.log(backup);
	}		
}
