/**
 * Power by CODESTD.COM
 * Licensed to see LICENSE in root. 
 */
(function($){

    $.extend({
        id:function(n){
            n = n || 16;
            var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            var res = "";
            for(var i = 0; i < n ; i ++) {
                var id = Math.ceil(Math.random()*35);
                res += chars[id];
            }
            return res;
        },
        emptyFn:function(){}

    });

    $.extend({
        Observable:function(){
            this.events = {};

            this.addEvents = function(){
                var me = this;
                for(var i=0;i<arguments.length;i++){
                    var eventName = arguments[i];
                    if(typeof eventName == 'string'){
                        me.events[arguments[i]] = $.emptyFn;
                    }
                }
            }

            this.addListener = function(eventName,handler){
                var events = this.events;
                if(events.hasOwnProperty(eventName) && $.isFunction(handler)){
                    events[eventName] = handler;
                }
            }

            this.fireEvent = function(eventName,scope){
                var events = this.events;
                var scope = scope || this;
                if(events.hasOwnProperty(eventName)){
                    var handler = events[eventName];
                    console.log(this)
                    if($.isFunction(handler)){
                        if(arguments.length > 1){
                            var args = [];
                            for(var i=1;i<arguments.length;i++){
                                args.push(arguments[i]);
                            }
                            handler.apply(scope,args);
                        }else{
                            handler.apply(scope)
                        }
                    }
                }
            }
        }
    })

    $.extend({
        mask:{
            /**
             * 是否创建mask元素
             * @private
             */
            _isCreate:false,

            /**
             * mask id
             */
            maskId:null,

            /**
             * 自动生成的mask id
             * 如果使用自定义的mask，可使用{@code $.mask.maskId = 'id'}来指定自己的mask;
             * @private
             */
            _defaultMaskId:'std_jquery_mask_'+$.id(),
            /**
             * 创建一个mask元素
             * @private
             */
            _createMask:function(){
                var existMask = $('#'+this.maskId);
                this._isCreate = true;
                if(existMask.length > 0){
                    return existMask;
                }else{
                    var mask = document.createElement('div');
                    mask = $(mask);
                    mask.attr('id',this._defaultMaskId).addClass('x-mask');
                    this.maskId = this._defaultMaskId;
                    $('body').append(mask);
                    return mask;
                }
            },

            /**
             * 获取mask元素
             * @returns {jQuery} mask的jquery对象
             * @private
             */
            _getMaskElement:function(){
                if(this._isCreate){
                    return $('#'+this.maskId);
                }else{
                    return this._createMask();
                }
            },

            /**
             * 
             */
            show : function(){
                var mask = this._getMaskElement();
                mask.show();
            },

            hide : function(){
                var mask = this._getMaskElement();
                mask.hide();
            }

        }//end mask

    })//end jquery extend

    $.fn.window = function(config){
        var me = this;
        $.extend(me,new $.Observable());

        me.addEvents('beforeRender','afterRender','onShow','onClose','onYes','onCancel','onOk');

        var winConfig = $.extend({
            height:300,
            width:500,
            title:'',
            btnClassPrefix:'x-win-btn',
            buttons:['ok','cancel'], //ok cancel yes no
            listeners:{}
        },config);

        $.extend(me,winConfig);

        var listeners = me.listeners;

        for(name in listeners){
            if(listeners.hasOwnProperty(name)){
                var handler = listeners[name];
                this.addListener(name,handler);
            }
        }

        me.fireEvent('afterRender',me);

        $.extend(me,{
            create:function(){
                var container = $('<div class="x-win"></div>');
                me.wrapAll(container);
                var header = $('<div class="x-win-header"></div>').html(me.title);
                var toolbar = $('<div class="x-win-toolbar"></div>');
                $.each(this.buttons,function(i,e){
                    toolbar.append('<button class="'+me.btnClassPrefix+'-'+e+'">OK</button>');
                });
                container.append(header);

                container.append(toolbar);
                //$('body').append(container);
                //me.after(header);

                console.log(container.html())
            }
        })

        this.create();


    }

})(jQuery)