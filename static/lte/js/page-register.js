(function($){function AdditionalAccountOpen(params){WidgetForm.apply(this,arguments);this.setup();}
AdditionalAccountOpen.prototype=$.extend(new WidgetForm(),{validation:null,fn_not_empty:null,fn_checked:null,accountTypesSetup:{},setup:function(){var registrationForm=this;this.accountTypesSetup=productProfiles;this.accountType=$('#account_type');this.bonusScheme=$('#bonus_scheme');this.currency=$('#currency_base');this.leverage=$('#new_leverage');this.generalTCUrl=$('#normal a').attr('href');this.ignoreGeneralTCUrl=$('#normal.ignoreGeneralTCUrl a').length;$('[data-toggle="tooltip"]').tooltip();$('input[name=additional_account_type]').click(function(){if($('input[name=additional_account_type]:checked').attr('value')=='1'){$('#account_type option[value="2"], #account_type option[value="7"], #account_type option[value="9"]').hide();}else{$('#account_type option[value="2"], #account_type option[value="7"], #account_type option[value="9"]').show();}});if(this.form.hasClass('locked')){this.form.css({'display':'none'});}
var validation=this.validation=new Form(),node=this.node,fn_not_empty=this.fn_not_empty=Validation.notEmpty,fn_checked=this.fn_checked=Validation.isChecked;this.fn_nickname_validation=function(){var nickname=$("#nick_name").val();var nonChineseRegEx=/^[a-zA-Z0-9#\,\-\. ]+$/;if(nonChineseRegEx.test(nickname)){return true;}else{return false;}};validation.add(node.find('#account_type'),{'validate':fn_not_empty}).add(node.find('#currency_base'),{'validate':fn_not_empty}).add(node.find('#new_leverage'),{'validate':fn_not_empty}).add(node.find('#terms'),{'validate':fn_checked}).add($('#tc_competition_confirm'),{'validate':fn_checked}).add($('#bonus_scheme'),{'validate':fn_not_empty});if(Object.keys(platforms).length>1){$('#platform_selector input').on('change',function(e){var activePlatform=$(e.target).val();registrationForm.selectTradingAccountFirst();registrationForm.fillAccountTypes(activePlatform);});}
this.fillAccountTypes(1);this.accountType.change(function(){var tradingAccount=$(this).val();var setup=registrationForm.getSetup();if(tradingAccount){registrationForm.leverage.empty().append('<option value="" >'+getSelectText(registrationForm.leverage)+'</option>');$.each(setup.leverage,function(index,data){registrationForm.leverage.append('<option value="'+data.id+'" >'
+data.title+'</option>');});registrationForm.leverage.val(setup.default);registrationForm.setupCurrency();registrationForm.setupBonus();registrationForm.bonusScheme.change();$.each([registrationForm.currency,registrationForm.leverage],function(index,object){object.removeAttr('disabled');});}else{registrationForm.selectTradingAccountFirst();}
if(tradingAccount==3){$('#normal').hide();$('#stp').show();}else{$('#normal').show();$('#stp').hide();}
registrationForm.showReferralAccountOptions();}).change();this.bonusScheme.change(function(){registrationForm.bonusCurrencyDependentSet(this);registrationForm.setTermsUrl();registrationForm.setGeneralTC();});this.currency.change(function(){registrationForm.bonusCurrencyDependentSet(this);registrationForm.setTermsUrl();registrationForm.cryptoNotice();registrationForm.setGeneralTC();});this.setupFieldHighlighting(validation);this.initChain();$("#platform_selector").first().button("toggle");},selectTradingAccountFirst:function(){$.each([this.currency,this.leverage,this.bonusScheme],function(index,object){object.empty().append('<option value="" >'+selectAccountFirst+'</option>').attr('disabled','disabled');});},fillAccountTypes:function(platform){var registrationForm=this;var getAccountType=function(type){var result='';$.each(registrationForm.accountTypesSetup.tradingAccountTypeList,function(index,element){if(element.type==type){result=element.title;}});return result;};this.accountType.empty().append('<option value="">'+selectTranslations.account_type+'</option>');var platformAccountTypes=platforms[platform].accountTypes;$.each(this.accountTypesSetup.accountTypes,function(index,account){if(platformAccountTypes.indexOf(Number(account.type))!==-1){registrationForm.accountType.append('<option value="'+account.type+'" >'
+getAccountType(account.type)+'</option>');}});this.accountType.removeAttr('disabled');if(platform==1){$('#additional_settings').show();}else{$('#additional_settings').hide();}
registrationForm.setGeneralTC();},cryptoNotice:function(){var currencyVal=this.currency.val();$('.crypto-notice').hide();if(this.accountTypesSetup.cryptoCurrencies.indexOf(currencyVal)!=-1){$('#'+currencyVal+'_notice').show();}},validate:function(values){return this.validation.validate();},_handleFormSubmit:function(){if(this.sending)return false;var values=this.form.serializeObject(),data;$('select',this.form).removeAttr('disabled');if(this.validate(values)){reportButtonClickOnFormValid(this.node.find('input[type="submit"],button[type="submit"]'))
this.sending=true;$("button[type=submit]").attr("disabled","disabled");return true;}
return false;},showReferralAccountOptions:function(){var accountType=this.accountType.val();if(accountType=='32'){$('#tc-mlm-confirm').show();$('#tc-mlm-confirm').attr('required','required');$('#mlm_tc_confirm').removeAttr('disabled');this.validation.add($('#mlm_tc_confirm'),{'validate':Validation.notEmpty});}else{$('#tc-mlm-confirm').hide();$('#tc-mlm-confirm').removeAttr('required');$('#mlm_tc_confirm').attr('disabled','disabled');this.validation.add($('#mlm_tc_confirm'),{});}},setGeneralTC:function(){var registrationForm=this;var generalConfigFound=false;var tradingAccountType=this.accountType.val();var profileValue=this.bonusScheme.val();$.each(this.accountTypesSetup.bonusProfiles,function(index,bonusConfig){if(bonusConfig.id==profileValue&&bonusConfig.accountTypes.includes(parseInt(tradingAccountType))&&'genericTC'in bonusConfig){$('#normal a').attr('href',bonusConfig.genericTC);generalConfigFound=true;}});if(!generalConfigFound&&!this.ignoreGeneralTCUrl){$('#normal a').attr('href',registrationForm.generalTCUrl);}},setTermsUrl:function(){this.removeNickNameContainer();var setUrl=function(url){$("input[name='tc_bonus_url']",this.form).val(url);$('#bonus_terms a',this.form).attr('href',url);$('#bonus_terms',this.form).show();$('#terms_confirm').prop('required',true);};var profileValue=this.bonusScheme.val();var currencyValue=this.currency.val();var tradingAccountType=this.accountType.val();if(this.accountTypesSetup.competition&&typeof(this.accountTypesSetup.competition.accountTypes)=='object'&&this.accountType.val()in this.accountTypesSetup.competition.accountTypes&&this.accountTypesSetup.competition.accountTypes[this.accountType.val()].bonusProfile==profileValue&&$.inArray(currencyValue,this.accountTypesSetup.competition.accountTypes[this.accountType.val()].currencyExcluded)==-1){$('#nickname-container',this.form).show();setUrl(this.accountTypesSetup.competition.termsUrl);var $nickname=$('#nick_name',this.form);$nickname.parsley().addConstraint('minlength',5).addConstraint('maxlength',19);return;}
var bonusConfigFound=false;$.each(this.accountTypesSetup.bonusProfiles,function(index,bonusConfig){if(bonusConfigFound==false&&bonusConfig.id==profileValue&&'termsConditionsUrl'in bonusConfig&&bonusConfig.accountTypes.includes(parseInt(tradingAccountType))){setUrl(bonusConfig.termsConditionsUrl);bonusConfigFound=true;}});if(bonusConfigFound){return;}
if(profileValue&&typeof(this.accountTypesSetup.bonusProfiles[profileValue])=='object'&&'termsConditionsUrl'in this.accountTypesSetup.bonusProfiles[profileValue]){var termsConditionsUrl=this.accountTypesSetup.bonusProfiles[profileValue].termsConditionsUrl;setUrl(termsConditionsUrl);return;}
this.removeTermsUrl();},setupCurrency:function(){var registrationForm=this;this.currency.empty().append('<option value="" >'+getSelectText(this.currency)+'</option>');var setup=this.getSetup();if(!('currency'in setup)){return;}
$.each(setup.currency,function(index,data){registrationForm.currency.append('<option value="'+data.id+'" >'
+data.title+'</option>');});},setupBonus:function(){var registrationForm=this;var tradingAccountSelected=registrationForm.accountType.val();var lastProfileValue=null;registrationForm.bonusScheme.empty().append('<option value="" >'+getSelectText(registrationForm.bonusScheme)+'</option>');$.each(registrationForm.accountTypesSetup.bonusProfiles,function(index,bonusConfig){if(bonusConfig.accountTypes.includes(parseInt(tradingAccountSelected))){lastProfileValue=bonusConfig.id;registrationForm.bonusScheme.append('<option value="'+bonusConfig.id+'" >'
+bonusConfig.title+'</option>');}});if($('option',registrationForm.bonusScheme).length==2){registrationForm.bonusScheme.attr('disabled','disabled').val(lastProfileValue);}else{registrationForm.bonusScheme.removeAttr('disabled');}},getSetup:function(){var tradingAccount=this.accountType.val();var result={};$.each(this.accountTypesSetup.accountTypes,function(index,element){if(element.type==tradingAccount){result=element;}});return result;},bonusCurrencyDependentSet:function(changedSelector){var $changedSelector=$(changedSelector);var dependentBonuses={};var dependentCurrencies={};$.each(this.accountTypesSetup.bonusProfiles,function(index,value){if(value.tradingAccountCurrency!=null){if(!(value.id in dependentBonuses)){dependentBonuses[value.id]=[];}
dependentBonuses[value.id].push.apply(dependentBonuses[value.id],value.tradingAccountCurrency);$.each(value.tradingAccountCurrency,function(tradingAccountIndex,tradingAccountType){if(!(tradingAccountType in dependentCurrencies)){dependentCurrencies[tradingAccountType]=[];}
dependentCurrencies[tradingAccountType].push(value.id);});}});var $bonusScheme=this.bonusScheme;var $currency=this.currency;if($changedSelector.attr('id')==$bonusScheme.attr('id')){var previousCurrencyVal=$currency.val();this.setupCurrency();if($bonusScheme.val()==''){return;}
if($bonusScheme.val()in dependentBonuses){$('option',$currency).each(function(index,element){if(dependentBonuses[$bonusScheme.val()].indexOf($(element).attr('value'))==-1&&$(element).attr('value')!=''){$(element).remove();}});}
$currency.val(previousCurrencyVal);}
if($changedSelector.attr('id')==$currency.attr('id')){var previousBonusVal=$bonusScheme.val();this.setupBonus();if($currency.val()==''){return;}
for(var currencyCode in dependentCurrencies){$('option',$bonusScheme).each(function(index,element){if(dependentCurrencies[currencyCode].indexOf($(element).val())!=-1&&$currency.val()!=currencyCode){$(element).remove();}});}
$bonusScheme.val(previousBonusVal);}},removeTermsUrl:function(){$("input[name='tc_bonus_url']",this.form).val('');$('#bonus_terms a',this.form).attr('href','#');$('#bonus_terms',this.form).hide();$('#terms_confirm').prop('required',false);},removeNickNameContainer:function(){$('#nickname-container',this.form).hide();var $nickname=$('#nick_name',this.form);if($nickname.length){$nickname.parsley().reset();}}});if($('.leverage-form').length){this.AdditionalAccountOpen=new AdditionalAccountOpen({'html':$('form.leverage-form')});}
function getSelectText(obj){id=obj.attr('id');if(selectTranslations[id]){return selectTranslations[id]}else{return'Select';}}})(jQuery);