/**
 * Power by CODESTD.COM
 * Licensed to see the LICENSE file in root.
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
             * 显示遮罩层
             */
            show : function(){
                var mask = this._getMaskElement();
                mask.show();
            },

            /**
             * 隐藏遮罩层
             */
            hide : function(){
                var mask = this._getMaskElement();
                mask.hide();
            }

        }//end mask

    })//end jquery extend

    $.fn.window = function(config){
        var me = this;
        this.id = 'win-'+$.id();
        //var container = $('<div class="x-win"></div>');
        //var winBody =

        //me = $(container);
        $.extend(me,new $.Observable());

        me.addEvents('beforeRender','afterRender','onShow','onClose','onYes','onCancel','onOk','onNo');

        var winConfig = $.extend({
            height:300,
            width:500,
            title:'',
            btnClassPrefix:'x-win-btn',
            buttons:['ok','cancel'], //ok cancel yes no
            okText:'确定',
            cancelText:'取消',
            yesText:'是',
            noText:'否',
            listeners:{}
        },config);

        $.extend(me,winConfig);

        var btnNameAndEventMapper = {
            ok:{name:this.okText,event:'onOk'},
            cancel:{name:this.cancelText,event:'onCancel'},
            yes:{name:this.yesText,event:'onYes'},
            no:{name:this.noText,event:'onNo'}
        }

        var listeners = me.listeners;

        for(eventName in listeners){
            if(listeners.hasOwnProperty(eventName)){
                var handler = listeners[eventName];
                this.addListener(eventName,handler);
            }
        }

        me.fireEvent('beforeRender',me);

        $.extend(me,{
            create:function(){
                $.extend(me,{
                    panel:$('<div id="'+me.id+'" class="x-win"></div>'),
                    header:$('<div class="x-win-header"></div>').html(me.title),
                    toolbar:$('<div class="x-win-toolbar"></div>'),
                    btns:[]
                })

                $.each(this.buttons,function(i,e){
                    var btnObj = btnNameAndEventMapper[e];
                    var btn = $('<button class="'+me.btnClassPrefix+'-'+e+'">'+btnObj.name+'</button>');
                    btn.click(function(){
                        me.fireEvent(btnObj.event,me);
                        me.close();
                    })
                    me.toolbar.append(btn);
                    me.btns.push(btn);
                });
                me.panel.append(me.header,me,me.toolbar);
                $('body').append(me.panel);
                me.panel.css({width:me.width,height:me.height});
                if(!me.hasClass('x-win-body'))me.addClass('x-win-body');
                me.fireEvent('afterRender',me);
            },
            autoBodyHeight:function(){
                var winHeight = me.panel.height();
                var headerHeight = $('.x-win-header').height();
                var toolbarHeight = $('.x-win-toolbar').height();
                $('.x-win-body').css('height',winHeight-headerHeight-toolbarHeight-3);
            },
            
            center:function(){
                var fullWidth = document.documentElement.clientWidth;
                var fullHeight = document.documentElement.clientHeight;
                var winWidth = me.panel.width();
                var winHeight = me.panel.height();
                var x = fullWidth/2 - winWidth/2;
                var y = fullHeight/2 - winHeight/2;
                me.panel.css({top:y,left:x});
            },
            open:function(){
                $.mask.show();
                me.panel.show();
                me.center();
                me.autoBodyHeight();
                me.fireEvent('onShow',me);
            },
            close:function(){
                $.mask.hide();
                me.panel.hide();
                me.fireEvent('onClose',me);
            }
        });

        this.create();

        return me;
    }

})(jQuery)