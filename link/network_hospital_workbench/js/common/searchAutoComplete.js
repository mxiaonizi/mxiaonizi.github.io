(function($) {
    $.fn.searchAutoComplete = function (options) {
    	var bt = $.browser;
        //根据浏览器设定不同属性
        var dialect = {
                topoffset:5,     //提示框top属性与输入框偏移
                widthoffset:60    //提示框width属性与输入框偏移    
            };
        var defaults = {
                url:options.url,
                keyUp : 38,//向上方向键
                keyDown : 40,//向下方向键
                keyEnter : 13,//回车键
                listHoverCSS : 'jhover',//提示框列表鼠标悬浮的样式
                tpl : '<div class="list"><div class="word">{'+options.value+'}</div><div class="view" style="display:none">{'+options.key+'}</div></div>',
                   submit:options.submit
        };
        var originalVal = new Array();
        var lastVal = new Array();
        var options = $.extend(defaults, $.extend(dialect, options));
        var dropDiv = $('<div></div>').addClass('dropDiv').appendTo('body');
        return this.each(function(i){
            var pa = $(this);
            var key = null;
            $(this).bind('keydown', function(event){
                if (dropDiv.css('display') != 'none') {//当提示层显示时才对键盘事件处理
                    var currentList = dropDiv.find('.' + options.listHoverCSS);
                    if (event.keyCode == options.keyDown) {//如果按的是向下方向键
                        if (currentList.length == 0) {
                            originalVal[i] = $(this).val();
                            //如果提示列表没有一个被选中,则将列表第一个选中
                            $(this).val(getPointWord(dropDiv.find('.list:first')
                                    .mouseover()));
                        } else if (currentList.next().length == 0) {
                            //如果是最后一个被选中,则取消选中,即可认为是输入框被选中
                            unHoverAll();
                            $(this).val(originalVal[i]);
                        } else {
                            unHoverAll();
                            //将原先选中列的下一列选中
                            if (currentList.next().length != 0)
                                $(this).val(getPointWord(currentList.next()
                                        .mouseover()));
                        }
                        return false;
                    } else if (event.keyCode == options.keyUp) {//如果按的是向上方向键
                        if (currentList.length == 0) {
                            originalVal[i] = $(this).val();
                            $(this).val(getPointWord(dropDiv.find('.list:last')
                                    .mouseover()));
                        } else if (currentList.prev().length == 0) {
                            unHoverAll();
                            $(this).val(originalVal[i]);
                        } else {
                            unHoverAll();
                            if (currentList.prev().length != 0)
                                $(this).val(getPointWord(currentList.prev()
                                        .mouseover()));
                        }
                        return false;
                    }else if(event.keyCode == options.keyEnter) {
                        //console.debug(currentList.length);
                        if(currentList.length == 0) 
                            if(options.submit[i]) {
                                $('#'+options.submit[i]).submit();
                            }
                        dropDiv.empty().hide();
                        return;
                    }
                }else if(event.keyCode == options.keyEnter)
                    //console.debug(options.submit[i]);
                    if(options.submit[i]) {
                        $('#'+options.submit[i]).submit();
                        return;
                    }
            }).bind('keyup', function(event){
                //输入框值没有改变返回
                if ($(this).val() == lastVal[i])
                    return;
                //当按键弹起记录输入框值,以方便查看键值有没有变
                lastVal[i] = $(this).val();
                //输入框值变为空返回
                if($(this).val() == ''){
                    dropDiv.empty().hide();
                    return;
                }
                //如果按下的向上或是向下键,说明在选择
                if(event.keyCode == options.keyUp||event.keyCode == options.keyDown) return;
                //输入框中值有变化,发送请求
                getData(pa, $(this).val());
            }).bind('blur', function(){
                //输入框失去焦点隐藏提示框,mousedown比
                //blur优先触发所以先处理选择提示框的内容
                dropDiv.empty().hide();
                if (options.callback) {
                	if($(this).val().replace(/\s+/g,"").length ==0){
                		return;
                	}
                   options.callback.call(this, key, $(this).val());
                };
            });
            
            /**处理ajax返回成功的方法**/
            var handleResponse = function(parent, json) {
            	var isEmpty = true;
                //for(var o in json){
                //	if(o == 'data') isEmpty = false;
                //}
                //if(isEmpty) {
                    //showError("返回数据格式错误,请检查请求URL是否正确!");
                //    dropDiv.empty().hide();
                //    return;
                //}
                if(json.length == 0) {
                    //返回数据为空
                    dropDiv.empty().hide();
                    return;
                }
                refreshDropDiv(parent, json);
                dropDiv.show();
            };
            /**处理ajax失败的方法**/
            var handleError = function(error) {
                dropDiv.empty().hide();
                showError("请求失败!"+arguments[1]);
            };
            var showError = function(error){
                //alert(error);
            };
            /**通过ajax返回json格式数据生成用来创建dom的字符串**/
            var render = function(parent, json) {
            	var res = json['data'] || json;
                var appendStr = '';
                //用json对象中内容替换模版字符串中匹配/\{([a-z]+)\}/ig的内容,如{word},{view}
                for ( var i = 0; i < res.length; i+=1) {
                    appendStr += options.tpl.replace(/\{([a-z]+)\}/ig, function(m, n) {
                        return res[i][n];
                    });
                }
                jebind(parent, appendStr);
            };
            /**将新建dom对象插入到提示框中,并重新绑定mouseover事件监听**/
            var jebind = function(parent, a) {
                dropDiv.append(a);
                dropDiv.find('.list').each(function() {
                    $(this).unbind('mouseover').mouseover(function() {
                        unHoverAll();
                        $(this).addClass(options.listHoverCSS);
                    }).unbind('mousedown').mousedown(function(){
                        parent.val(getPointWord($(this)));
                        dropDiv.empty().hide();
                        parent.focus();
                    });
                });
            };
            /**将提示框中所有列的hover样式去掉**/
            var unHoverAll = function() {
                dropDiv.find('.list').each(function() {
                    $(this).removeClass(options.listHoverCSS);
                });
            };
            /**在提示框中取得当前选中的提示关键字**/
            var getPointWord = function(p) {
                key = p.find('div:last').text();
            	$("#InstitutionID").val(p.find('div:last').text());
                return p.find('div:first').text();
            };
            /**刷新提示框,并设定样式**/
            var refreshDropDiv = function(parent, json) {
            	var left = parent.offset().left;
                var height = parent.height();
                var top = parent.offset().top + options.topoffset + height;
                var width = options.width || (parent.width()+options.widthoffset) + 'px';
                dropDiv.empty();
                dropDiv.css( {
                    'border' : '1px solid #999',
                    'left' : left,
                    'top' : top,
                    'width' : width
                });
                render(parent, json);
                //防止ajax返回之前输入框失去焦点导致提示框不消失
                parent.focus();
            };
            /**通过ajax向服务器请求数据**/
            var getData = function(parent, word) {
            	if(word.replace(/\s+/g,"").length ==0){
            		return;
            	}
                var k1 = options.value,
                    k2 = "rand";
                var str = {};
                str[k1] = word;
                str[k2] = Math.random();
                //处理扩展参数
            	for (var i in options.extendParamNameList){
            		str[options.extendParamNameList[i]]=$("#"+options.extendParamNodeIDList[i]).val();
            	}
                $.ajax( {
                    type : 'POST',
                    data : str,
                    // data : {""+tt+"":word,rand:Math.random()},
                    url : options.url,
                    dataType : 'json',
                    timeout : 15000,
                    success : function(json){handleResponse(parent, json);},
                    error : handleError
                });
            };
        });
      };
})(jQuery);