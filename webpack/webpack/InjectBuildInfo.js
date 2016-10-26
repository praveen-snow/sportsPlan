function InjectBuildInfo(opts) {
	opts = opts || {};
	this.assetRoot = opts.assetRoot || __dirname;
}

InjectBuildInfo.prototype.apply = function(compiler) {
	compiler.plugin("after-emit", function(compilation, callback) {
		var indexName = 'index.html';
		console.log('Build info injection, searching assets for:', indexName);

		var index = compilation.assets['index.html'] || false;
		let localRev ='';
		let originRev = '';
		let changes = '';
		let branch = '';

		if(index) {
			console.log(indexName, 'found, attempting to create and inject build info.');

			try {
				let proc = require('child_process');

				localRev = proc.execSync('git rev-parse HEAD').toString();
				if(localRev.indexOf('is not recognized') >= 0) {
					throw 'git not found';
				} else if(localRev.indexOf('Not a git repository') >= 0) {
					throw 'git repo not found';
				}
				localRev = localRev.replace(/\n$/, "");

				branch = proc.execSync('git rev-parse --abbrev-ref HEAD')
					.toString().replace(/\n$/, "");

				originRev = proc.execSync('git rev-parse origin/' + branch)
					.toString().replace(/\n$/, "");

				changes = proc.execSync('git diff --name-only ' + originRev)
					.toString().replace(/\n$/, "");

				changes = changes.length ? changes.split('\n') : [];
				console.log('Got Information from GIT repository at '+(new Date).getTime()+'\n');
			} catch(e) {
				console.log('Error creating build info, skipping.', e);
			}
		} else {
			console.log(indexName, 'not found, skipping build info injection.');
		}

		let buildData = {
			time: (new Date).getTime(),
			localRev: localRev,
			originRev: originRev,
			changes: changes
		};
		var d=new Date();

		var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +d.getHours() + ":" + d.getMinutes();

		console.log('Build Info:', buildData);

		doInjection(index.existsAt, buildData);

		console.log('Build info injection complete.  - '+datestring+'\n');

		callback();
	});
};

function doInjection(fileName, data) {
	var fs = require('fs')
	var fileContents = fs.readFileSync(fileName, 'utf8').toString();
	// Regex below matches "{/*build_json_inject*/}"
	fileContents = fileContents.replace(/\{\/\*build_json_inject\*\/\}/, JSON.stringify(data));
	fs.writeFileSync(fileName, fileContents, 'utf8');
}

module.exports = InjectBuildInfo;
