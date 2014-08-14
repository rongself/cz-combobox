/*
* author ronc
*
* 2014/2/21
* */
(function($){
	var CzCombobox = function (element, options) {
        var self = this;
        var $ele = $(element);
        var $options = $ele.children('option');
        var comboboxTemplate = '<div class="cz-select">\
									<div></div>\
									<ul>\
									</ul>\
								</div>';
        var optionTemplate = '<li data-value=""></li>';
        self.combobox = {}
        self.init = function () {
            $ele.hide();
            self.combobox = $(comboboxTemplate).insertAfter($ele);
			console.log(self.combobox);
            self.combobox.text = self.combobox.children('div');
            self.combobox.content = self.combobox.children('ul');
			self.combobox.content.hide();
            $options.each(function () {
                var value = $(this).attr('value');
                var text = $(this).text();
                self.addOption(text,value,false);
            });
			self.combobox.options = self.combobox.content.children('li');
			//console.log(self.combobox.content.options.first());
			self.setText(self.combobox.options.first().text());
            self.combobox.trigger('load');
        }
		self.addOption = function (text,value,isSelected) {
			$(optionTemplate).appendTo(self.combobox.content).text(text).attr('data-value',value);
			if(isSelected){

			}
		}
        self.setText = function(text){
            self.combobox.text.text(text);
        }
		self.setValue = function(value){
			$ele.val(value);
		}
        self.setSelectedItem = function (item) {
			$(item).prependTo(self.combobox.content);
			self.setText($(item).text());
            self.setValue($(item).attr('data-value'));
            $ele.trigger('change');
        }
		
        self.remove = function () {

        }
		self.open = function(){
			if(self.combobox.content.is(':hidden')){
                var heght = parseInt(self.combobox.content.outerHeight())/2;
                var theight = parseInt(self.combobox.outerHeight());
                var twidth = parseInt(self.combobox.outerWidth());
                self.combobox.content.children('li').css({
                    'height':theight,
                    'line-height':theight+'px',
                    'width':twidth-26
                });
				self.combobox.content.show().css('top',-heght).animate({'top':0,'opacity':'1'},120);
            }
		}
		
		self.close = function(){
			if(!self.combobox.content.is(':hidden')){
				var heght = parseInt(self.combobox.content.height())/2;
				self.combobox.content.animate({'top':-heght,'opacity':0},120,function(){
					$(this).hide();
				});
			}
		}
		self.init();
		self.combobox.text.on('click',function(){
            if(self.combobox.content.is(':hidden')){
                self.open();
            }else{
                self.close();
            }
			return false;
       }); 
	   self.combobox.options.on({
			'click':function(){
				self.close();
				self.setSelectedItem(this);
				return false;
			},
			'mouseenter':function(){
				$(this).addClass('hover');
			},
			'mouseleave':function(){
				$(this).removeClass('hover');
			}
	   })
	   self.combobox.content.focus(function(){
			alert();
	   });
	   $("html").click(function(){
			self.close();
	   });
    }
    var defaults = {
        class:'deleteBtn'
    }
    $.fn.czCombobox = function (options) {
        var callArgs = $.makeArray(arguments).slice(1);
        this.each(function () {
            if (!this.Instance) {
                var instance = new CzCombobox(this, $.extend({}, defaults, options || {}));
                this.Instance = instance;
            }
            else if (typeof (options) == 'string') {
                var method = this.Instance[options];
                if (typeof method == 'function') {
                    return method.apply(this.Instance, callArgs);
                }
                else {
                    throw 'not support option: ' + options;
                }
            }
        });
    }
})(jQuery);
