var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    gm=require('gm'),
    Q=require('q');

function placeholder() {

    var regColor=/^[a-f0-9]{3}$|^[a-f0-9]{6}$/;

    var defaults = {
        backgroundColor: 'cccccc',
        cache: true,
        cacheDir: path.join(__dirname, '../cache'),
        expires: 604800,
        font:path.join(__dirname,'../font/calibril.ttf'),
        fontSize:48,
        maxHeight: 2000,
        maxWidth: 2000,
        textColor: '969696'
    };

    var self = _.assign(defaults, arguments[0]);
  
    /**
     * Sets background color
     * 
     * @param {[string]} val [Hex code value]
     */
    this.setBackgroundColor = function(val) {

        if(val.length===3 || val.length===6){
            if(regColor.test(val)){
                self.backgroundColor = val;
            }else{
                throw new Error('InvalidArgumentException',"Background color must be a valid RGB hex code.")
            }
        }else{
            throw new Error('InvalidArgumentException',"Background color must be 3 or 6 character hex code.")
        }
        
    };

    /**
     * Gets background color
     */
    this.getBackgroundColor = function() {
        return self.backgroundColor;
    };

    /**
     * Sets text color
     * 
     * @param {[string]} val [Hex code value]
     */
    this.setTextColor = function(val) {

        if(val.length===3 || val.length===6){
            if(regColor.test(val)){
                self.textColor = val;
            }else{
                throw new Error('InvalidArgumentException',"Background color must be a valid RGB hex code.")
            }
        }else{
            throw new Error('InvalidArgumentException',"Background color must be 3 or 6 character hex code.")
        }
    };

    /**
     * Gets text color
     * 
     * @return {[string]}
     */
    this.getTextColor = function() {
        return self.textColor;
    };

    /**
     * Sets location of TTF font
     * 
     * @param {[string]} val [Hes code value]
     * @throws InvalidArgumentException
     */
    this.setFont = function(val) {
        self.font = val;
    };

    /**
     * Gets Font
     * @return {[type]}
     */
    this.getFont = function() {
        return self.font;
    };

    /**
     * Sets location of TTF fontsize
     * 
     * @param {[string]} val [Hes code value]
     * @throws InvalidArgumentException
     */
    this.setFontSize = function(val) {
        self.fontSize = val;
    };

    /**
     * Gets FontSize
     * 
     * @return {[type]}
     */
    this.getFontSize = function() {
        return self.fontSize;
    };

    /**
     * Sets Expires
     * 
     * @param {[type]} val [description]
     */
    this.setExpires = function(val) {
        self.expires = val;
    };

    /**
     * Gets Expires 
     */
    this.getExpires = function() {
        return self.expires;
    };
    
    /**
     * Sets Max Width
     * @param {[type]} val [description]
     */
    this.setMaxWidth = function(val) {
        self.maxWidth = val;
    };

    /**
     * Gets Max Width
     * @return {[type]} [description]
     */
    this.getMaxWidth = function() {
        return self.maxWidth;
    };

    /**
     * Sets Cache
     * @param {[type]} val [description]
     */
    this.setCache = function(val) {
        self.cache = val;
    };

    /**
     * Gets Cache
     * @return {[type]} [description]
     */
    this.getCache = function() {
        return self.cache;
    };

    /**
     * Sets CacheDir
     * @param {[type]} val [description]
     */
    this.setCacheDir = function(val) {
        self.cacheDir = val;
    };

    /**
     * Gets CacheDir
     * @return {[type]} [description]
     */
    this.getCacheDir = function() {
        return self.cacheDir;
    };

    /**
     * sets MaxWidth
     * @param {[type]} val [description]
     */
    this.setMaxWidth = function(val) {
        self.maxWidth = val;
    };

    /**
     * Gets MaxWidth
     * @return {[type]} [description]
     */
    this.getMaxWidth = function() {
        return self.maxWidth;
    };

    /**
     * Sets MaxHeight
     * @param {[type]} val [description]
     */
    this.setMaxHeight = function(val) {
        self.maxHeight = val;
    };

    /**
     * Gets MaxHeight
     * @return {[type]} [description]
     */
    this.getMaxHeight = function() {
        return self.maxHeight;
    };

    /**
     * Sets Width
     * @param {[type]} val [description]
     */
    this.setWidth = function(val) {
        self.width = val;
    };

    /**
     * Gets Width
     * @return {[type]} [description]
     */
    this.getWidth = function() {
        return self.width;
    };

    /**
     * Sets Height
     * @param {[type]} val [description]
     */
    this.setHeight = function(val) {
        self.height = val;
    };

    /**
     * Gets Height
     * @return {[type]} [description]
     */
    this.getHeight = function() {
        return self.height;
    };
    
    /**
     * [getFilePath description]
     * @return {[type]} [description]
     */
    this.getFilePath=function(){

        var width=this.getWidth(),
            height=this.getHeight(),
            backgroundColor="#"+this.getBackgroundColor(),
            drawText=width+'x'+height,
            textColor="#"+this.getTextColor(),
            font=this.getFont(),
            fontSize=this.getFontSize(),
            cacheDir=this.getCacheDir(),
            cachePath;

        width=width>this.getMaxWidth()?this.getMaxWidth():width;
        height=height>this.getMaxHeight()?this.getMaxHeight():height;

        cachePath=path.join(cacheDir,drawText+'_'+backgroundColor+'_'+textColor+'_'+fontSize+'.png');

        return cachePath;
    }

    /**
     * [getFileContent description]
     * @param  {[type]} filePath [description]
     * @param  {[type]} encoding [description]
     * @return {[type]}          [description]
     */
    this.getFileContent=function(filePath,encoding){

        var deferred = Q.defer();

        fs.readFile(filePath,encoding,function(err, file) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(file,encoding);
            }
        }); 

        return deferred.promise;
    }
    
    /**
     * [getExpires description]
     * @return {[type]} [description]
     */
    this.getExpires=function(){
        var newExpires=new Date(),
            year;
            
        year=newExpires.getFullYear();
        year=year+1;

        newExpires.setFullYear(year);
        return newExpires;
    }

    /**
     * [isExisted description]
     * @param  {[type]}  filePath [description]
     * @return {Boolean}          [description]
     */
    this.isExisted=function(filePath){

        var deferred = Q.defer();

        fs.exists(filePath,function(exists){
            deferred.resolve(exists);
        });

        return deferred.promise;
    }

    /**
     * [touchFile description]
     * @param  {[type]} filePath [description]
     * @return {[type]}          [description]
     */
    this.touchFile=function(filePath){

        var deferred=Q.defer();

        fs.stat(filePath,new Date(),new Date(),function(){
            if(err){
                throw new Error('[RuntimeException]'+err);
            }else{
                deferred.resolve(true);
            }
        }); 

        return deferred.promise;
    }

    /**
     * [createImage description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    this.createImage=function() {

        var deferred=Q.defer();

        var width=this.getWidth(),
            height=this.getHeight(),
            drawText=width+'x'+height,
            textColor="#"+this.getTextColor(),
            backgroundColor="#"+this.getBackgroundColor(),
            font=this.getFont(),
            fontSize=this.getFontSize(),
            cacheDir=this.getCacheDir(),
            cachePath;

        cachePath=this.getFilePath();
        fontSize=width/(drawText.length);


        return gm(width,height,backgroundColor)
                    .fill(textColor)
                    .drawText(0,0,drawText,"Center")
                    .font(font,fontSize);
    }

    /**
     * [saveToPng description]
     * @return {[type]} [description]
     */
    this.saveToPng=function(gm,filePath){
        var deferred = Q.defer();
        
        gm.write(filePath,function(err){
            if(!err){
                deferred.resolve(true);
            }else{
                deferred.reject(err);
            }
        });

        return deferred.promise;
    } 
}

/**
 * [render description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
placeholder.prototype.render=function(res){

    var thisp=this;
    var cachePath=this.getFilePath();

    res.setHeader('Content-type','image/png');
    res.setHeader('Expires',this.getExpires().toUTCString());
    res.setHeader('Cache-Control','max-age=2592000');
 
    thisp.isExisted(cachePath)
        .then(function(exists){
            if(exists && thisp.getCache()){ 
                //get file content
                thisp
                    .getFileContent(cachePath)
                    .then(function(file,encoding){
                        res.setHeader('Img-Src-Cache','hit'); 
                        res.write(file,encoding);
                        res.end();
                        return cachePath;
                    })
                    .then(thisp.touchFile);

            }else{
                if(thisp.getCache()){
                    res.setHeader('Img-Src-Cache','miss');
                }

                var newImage=thisp.createImage();

                //save to image
                thisp
                    .saveToPng(newImage,cachePath)
                    .then(function(result){
                        if(result){
                            console.log('Image:'+cachePath+' is created success.');
                            return cachePath;
                        }
                    })
                    .then(thisp.getFileContent)
                    .then(function(file,encoding){
                        res.write(file,encoding);
                        res.end();
                    });
            } 
        })
        .then(null,function(err){
            console.log(err);
        });
}

module.exports = placeholder;