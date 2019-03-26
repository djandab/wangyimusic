module.exports = {
  configureWebpack: {
		devServer:{
			proxy:{
				'/api' :{
					target:'https://api.bzqll.com',
					changeOrigin:true,
					pathRewrite:{
						'^/api':''
					}
				}
			}
		}
  }
}