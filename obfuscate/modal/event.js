const a5_0xe96d=['find','#create-event','removeClass','Create\x20\x27','endRecur','#alert','recur','some','hide','start','modal','end','create','.modal\x20.btn-secondary','title','responseJSON','#myModal','values','.update','attr','msg','undefined','weekString','.title','.modal-text','click','remove','These\x20special\x20characters\x20will\x20be\x20remove.\x20Are\x20you\x20sure\x20you\x20want\x20to\x20continue?','Select\x20a\x20date\x20to\x20end\x20recurring\x20event','delete','each','#end-time\x20option:selected','date','api/event/create','target','.recur-block','addClass','ajax','.recur-end','#innerModal','#date','api/event/update','0000000','-text','test','.btn-secondary','#start-time\x20option:selected','val','show','.event','append','Update\x20\x27','post','empty','Select\x20at\x20least\x20one\x20weekday','length','Are\x20you\x20sure\x20you\x20want\x20to\x20create\x20the\x20event\x20\x27','preventDefault','#recur','.room','alert-success','Fields\x20contain\x20special\x20characters','room','reload','alert-danger','recurId','#room','api/event/delete','.modal-title','Are\x20you\x20sure\x20you\x20want\x20to\x20update\x20the\x20event\x20\x27','.end-time\x20option:selected','update','Please\x20enter\x20an\x20event\x20title\x20less\x20than\x2015\x20characters','css',':checked','.date','building','parents'];(function(_0x461b46,_0xe96dce){const _0x1cbabb=function(_0x31e21e){while(--_0x31e21e){_0x461b46['push'](_0x461b46['shift']());}};_0x1cbabb(++_0xe96dce);}(a5_0xe96d,0x18a));const a5_0x1cba=function(_0x461b46,_0xe96dce){_0x461b46=_0x461b46-0x0;let _0x1cbabb=a5_0xe96d[_0x461b46];return _0x1cbabb;};function alert(_0xf6a772,_0x29204c,_0xdd8286){$(_0xf6a772)[a5_0x1cba('0x4c')](_0xdd8286?'alert-danger':'alert-success');$(_0xf6a772)[a5_0x1cba('0x20')](_0xdd8286?a5_0x1cba('0x38'):a5_0x1cba('0x3c'));$(_0xf6a772+a5_0x1cba('0x27'))[a5_0x1cba('0x31')]();$(_0xf6a772+a5_0x1cba('0x27'))[a5_0x1cba('0x2e')](_0x29204c);$(_0xf6a772)[a5_0x1cba('0x2c')]();}function modal(_0xe3e268,_0x108c52,_0x486f80,_0xac952a){if(typeof _0xac952a===a5_0x1cba('0x11')){$(_0xe3e268)[a5_0x1cba('0x4a')](a5_0x1cba('0x29'))[a5_0x1cba('0xf')]('id',a5_0x1cba('0x8'));}else if(_0xac952a){$(_0xe3e268)[a5_0x1cba('0x4a')]('.btn-secondary')[a5_0x1cba('0xf')]('id',a5_0x1cba('0x43'));}else{$(_0xe3e268)[a5_0x1cba('0x4a')](a5_0x1cba('0x29'))['attr']('id',a5_0x1cba('0x19'));}$(_0xe3e268)['find']('.modal-title')[a5_0x1cba('0x31')]();$(_0xe3e268)[a5_0x1cba('0x4a')](a5_0x1cba('0x40'))[a5_0x1cba('0x2e')](_0x108c52);$(_0xe3e268)[a5_0x1cba('0x4a')](a5_0x1cba('0x14'))[a5_0x1cba('0x31')]();$(_0xe3e268)[a5_0x1cba('0x4a')](a5_0x1cba('0x14'))[a5_0x1cba('0x2e')](_0x486f80);$(_0xe3e268)[a5_0x1cba('0x6')](a5_0x1cba('0x2c'));}function isInvalid(_0x27d6c8){return/[`~!@#$%^&*()|+=?;'",.<>\{\}\[\]\\]/g[a5_0x1cba('0x28')](_0x27d6c8);}let createEvent={};let updateEvent={};let deleteEvent='';$(a5_0x1cba('0x4b'))[a5_0x1cba('0x15')](_0x40ac63=>{_0x40ac63[a5_0x1cba('0x35')]();createEvent[a5_0x1cba('0xa')]=$('#title')['val']();createEvent['building']=$('#building')['val']();createEvent[a5_0x1cba('0x3a')]=$(a5_0x1cba('0x3e'))[a5_0x1cba('0x2b')]();createEvent[a5_0x1cba('0x1c')]=$(a5_0x1cba('0x24'))[a5_0x1cba('0x2b')]();createEvent[a5_0x1cba('0x5')]=$(a5_0x1cba('0x2a'))[a5_0x1cba('0x2b')]();createEvent['end']=$(a5_0x1cba('0x1b'))[a5_0x1cba('0x2b')]();createEvent[a5_0x1cba('0x0')]=$('#recur-end')[a5_0x1cba('0x2b')]();let _0x24cf7f='';if(String(createEvent['title'])[a5_0x1cba('0x33')]>0xf){$(a5_0x1cba('0xc'))[a5_0x1cba('0x6')](a5_0x1cba('0x4'));alert(a5_0x1cba('0x1'),a5_0x1cba('0x44'),![]);return;}if(Object['values'](createEvent)[a5_0x1cba('0x3')](_0x3d7f54=>isInvalid(_0x3d7f54))){modal('#innerModal',a5_0x1cba('0x39'),a5_0x1cba('0x17'));return;}if($(a5_0x1cba('0x36'))['is'](':checked')){$('.form-row')[a5_0x1cba('0x4a')]('.form-check-input')[a5_0x1cba('0x1a')](function(){if($(this)[a5_0x1cba('0xf')]('id')!==a5_0x1cba('0x2')){if($(this)['is'](':checked')){_0x24cf7f+='1';}else{_0x24cf7f+='0';}}});if(_0x24cf7f===a5_0x1cba('0x26')){$('#myModal')['modal'](a5_0x1cba('0x4'));alert(a5_0x1cba('0x1'),'Select\x20at\x20least\x20one\x20weekday',![]);}if(!createEvent[a5_0x1cba('0x0')]){$(a5_0x1cba('0xc'))[a5_0x1cba('0x6')]('hide');alert(a5_0x1cba('0x1'),a5_0x1cba('0x18'),![]);}}createEvent[a5_0x1cba('0x12')]=_0x24cf7f;modal(a5_0x1cba('0x23'),a5_0x1cba('0x4d')+createEvent[a5_0x1cba('0xa')]+'\x27?',a5_0x1cba('0x34')+createEvent[a5_0x1cba('0xa')]+'\x27');});$(document)['on']('click',a5_0x1cba('0xe'),_0x236373=>{_0x236373[a5_0x1cba('0x35')]();const _0x539e8e=$(_0x236373['target'])[a5_0x1cba('0x49')]('.event');updateEvent['id']=_0x539e8e['attr']('id');updateEvent[a5_0x1cba('0xa')]=_0x539e8e['find'](a5_0x1cba('0x13'))['val']();updateEvent['date']=_0x539e8e[a5_0x1cba('0x4a')](a5_0x1cba('0x47'))[a5_0x1cba('0x2b')]();updateEvent[a5_0x1cba('0x48')]=_0x539e8e[a5_0x1cba('0x4a')]('.building')[a5_0x1cba('0x2b')]();updateEvent[a5_0x1cba('0x3a')]=_0x539e8e[a5_0x1cba('0x4a')](a5_0x1cba('0x37'))[a5_0x1cba('0x2b')]();updateEvent[a5_0x1cba('0x5')]=_0x539e8e['find']('.start-time\x20option:selected')[a5_0x1cba('0x2b')]();updateEvent[a5_0x1cba('0x7')]=_0x539e8e[a5_0x1cba('0x4a')](a5_0x1cba('0x42'))['val']();updateEvent[a5_0x1cba('0x0')]=_0x539e8e[a5_0x1cba('0x4a')](a5_0x1cba('0x22'))[a5_0x1cba('0x2b')]();if(String(updateEvent['title'])[a5_0x1cba('0x33')]>0xf){$(a5_0x1cba('0xc'))[a5_0x1cba('0x6')](a5_0x1cba('0x4'));alert(a5_0x1cba('0x1'),a5_0x1cba('0x44'),![]);return;}if(Object[a5_0x1cba('0xd')](updateEvent)['some'](_0xf48bd5=>isInvalid(_0xf48bd5))){modal(a5_0x1cba('0x23'),a5_0x1cba('0x39'),'These\x20special\x20characters\x20will\x20be\x20remove.\x20Are\x20you\x20sure\x20you\x20want\x20to\x20continue?');return;}let _0x3e7916='';let _0x35c139=![];let _0x32458e='';if(_0x539e8e[a5_0x1cba('0x4a')](a5_0x1cba('0x1f'))[a5_0x1cba('0x45')]('display')==='block'){_0x32458e=_0x539e8e[a5_0x1cba('0x4a')](a5_0x1cba('0x1f'))[a5_0x1cba('0xf')]('id');$(_0x539e8e['find']('.form-check-input'))[a5_0x1cba('0x1a')](function(){if($(this)[a5_0x1cba('0xf')]('id')!==a5_0x1cba('0x2')){if($(this)['is'](a5_0x1cba('0x46'))){_0x35c139=!![];_0x3e7916+='1';}else{_0x3e7916+='0';}}});if(!_0x35c139){alert(a5_0x1cba('0x32'));}if(!updateEvent['endRecur']){alert(a5_0x1cba('0x18'));}}updateEvent[a5_0x1cba('0x12')]=_0x3e7916;updateEvent[a5_0x1cba('0x3d')]=_0x32458e;modal(a5_0x1cba('0x23'),a5_0x1cba('0x2f')+updateEvent[a5_0x1cba('0xa')]+'\x27?',a5_0x1cba('0x41')+updateEvent['title']+'\x27',!![]);});$(document)['on'](a5_0x1cba('0x15'),'.delete',_0x3be4b1=>{_0x3be4b1[a5_0x1cba('0x35')]();const _0x25ad50=$(_0x3be4b1[a5_0x1cba('0x1e')])[a5_0x1cba('0x49')](a5_0x1cba('0x2d'))[a5_0x1cba('0x4a')](a5_0x1cba('0x13'))[a5_0x1cba('0x2b')]();deleteEvent=$(_0x3be4b1[a5_0x1cba('0x1e')])[a5_0x1cba('0x49')](a5_0x1cba('0x2d'))[a5_0x1cba('0xf')]('id');modal(a5_0x1cba('0x23'),'Update\x20\x27'+_0x25ad50+'\x27?',a5_0x1cba('0x41')+_0x25ad50+'\x27',![]);});$(document)['on'](a5_0x1cba('0x15'),a5_0x1cba('0x9'),_0x5cd591=>{$(a5_0x1cba('0x23'))[a5_0x1cba('0x6')](a5_0x1cba('0x4'));$('#myModal')[a5_0x1cba('0x6')](a5_0x1cba('0x4'));const _0x37236b=$(_0x5cd591[a5_0x1cba('0x1e')])[a5_0x1cba('0xf')]('id');if(_0x37236b===a5_0x1cba('0x19')){$[a5_0x1cba('0x21')]({'type':a5_0x1cba('0x30'),'url':a5_0x1cba('0x3f'),'data':{'id':deleteEvent},'success':function(_0x56352b){$(_0x5cd591[a5_0x1cba('0x1e')])['parents'](a5_0x1cba('0x2d'))[a5_0x1cba('0x16')]();location[a5_0x1cba('0x3b')]();},'error':function(_0x21ffa7){$(a5_0x1cba('0x23'))[a5_0x1cba('0x6')]('hide');alert(a5_0x1cba('0x1'),_0x21ffa7[a5_0x1cba('0xb')][a5_0x1cba('0x10')],![]);}});}else if(_0x37236b===a5_0x1cba('0x43')){$[a5_0x1cba('0x21')]({'type':a5_0x1cba('0x30'),'url':a5_0x1cba('0x25'),'data':{'id':updateEvent['id'],'title':updateEvent[a5_0x1cba('0xa')],'date':updateEvent['date'],'building':updateEvent['building'],'room':updateEvent[a5_0x1cba('0x3a')],'start':updateEvent['start'],'end':updateEvent[a5_0x1cba('0x7')],'weekString':updateEvent[a5_0x1cba('0x12')],'endRecur':updateEvent['endRecur'],'recurId':updateEvent[a5_0x1cba('0x3d')]},'success':function(_0x482962){$(a5_0x1cba('0x23'))[a5_0x1cba('0x6')](a5_0x1cba('0x4'));location[a5_0x1cba('0x3b')]();},'error':function(_0x549241){$(a5_0x1cba('0x23'))[a5_0x1cba('0x6')](a5_0x1cba('0x4'));alert(a5_0x1cba('0x1'),_0x549241[a5_0x1cba('0xb')][a5_0x1cba('0x10')],![]);}});}else{$[a5_0x1cba('0x21')]({'type':a5_0x1cba('0x30'),'url':a5_0x1cba('0x1d'),'data':{'title':createEvent[a5_0x1cba('0xa')],'building':createEvent['building'],'room':createEvent[a5_0x1cba('0x3a')],'date':createEvent[a5_0x1cba('0x1c')],'start':createEvent['start'],'end':createEvent[a5_0x1cba('0x7')],'weekString':createEvent[a5_0x1cba('0x12')],'endRecur':createEvent['endRecur']},'success':function(_0x1a8f5d){location['reload']();},'error':function(_0x5791e1){$(a5_0x1cba('0xc'))[a5_0x1cba('0x6')](a5_0x1cba('0x4'));alert(a5_0x1cba('0x1'),_0x5791e1[a5_0x1cba('0xb')][a5_0x1cba('0x10')],![]);}});}});