const a11_0x4543=['#myModal','results','Update\x20\x27','ajax','show','preventDefault','click','username','api/user','val','#manage-card','</b>\x27?','-text','password','empty','#admin','#confirm-password','#manage-user','post','.modal-text','append','.modal-title','#alert','modal','#password','fname','delete','responseJSON','msg','.modal\x20.btn-secondary','#username','hide','admin'];(function(_0x3a2320,_0x4300e7){const _0x14d091=function(_0x7fa949){while(--_0x7fa949){_0x3a2320['push'](_0x3a2320['shift']());}};_0x14d091(++_0x4300e7);}(a11_0x4543,0x1ef));const a11_0x40fd=function(_0x3a2320,_0x4300e7){_0x3a2320=_0x3a2320-0x0;let _0x14d091=a11_0x4543[_0x3a2320];return _0x14d091;};function alert(_0x1d6d02,_0x34dc9a){$(_0x1d6d02)[a11_0x40fd('0x4')]();$(_0x1d6d02+a11_0x40fd('0xc'))[a11_0x40fd('0xe')]();$(_0x1d6d02+'-text')['append'](_0x34dc9a);}let user={};$[a11_0x40fd('0x3')]({'type':'post','url':a11_0x40fd('0x8'),'data':{},'success':function(_0x4ced40){user=_0x4ced40[a11_0x40fd('0x1')];$(a11_0x40fd('0x1e'))['val'](_0x4ced40[a11_0x40fd('0x1')][a11_0x40fd('0x7')]);$(a11_0x40fd('0x18'))[a11_0x40fd('0x9')](_0x4ced40[a11_0x40fd('0x1')][a11_0x40fd('0xd')]);$(a11_0x40fd('0x10'))[a11_0x40fd('0x9')](_0x4ced40[a11_0x40fd('0x1')]['password']);$('#fname')[a11_0x40fd('0x9')](_0x4ced40[a11_0x40fd('0x1')][a11_0x40fd('0x19')]);$('#lname')['val'](_0x4ced40['results']['lname']);$(a11_0x40fd('0xf'))['append'](_0x4ced40['results'][a11_0x40fd('0x20')]?'Yes':'No');},'error':function(_0x40803a){$(a11_0x40fd('0x16'))[a11_0x40fd('0xe')]();$(a11_0x40fd('0x16'))[a11_0x40fd('0x14')](_0x40803a[a11_0x40fd('0x1b')][a11_0x40fd('0x1c')]);}});$(a11_0x40fd('0x11'))[a11_0x40fd('0x6')](_0x193a2a=>{_0x193a2a[a11_0x40fd('0x5')]();$('.modal\x20.btn-secondary')['attr']('id',a11_0x40fd('0x1a'));$(a11_0x40fd('0x15'))[a11_0x40fd('0xe')]();$('.modal-title')[a11_0x40fd('0x14')](a11_0x40fd('0x2')+user[a11_0x40fd('0x7')]+'\x27?');$(a11_0x40fd('0x13'))[a11_0x40fd('0xe')]();$(a11_0x40fd('0x13'))[a11_0x40fd('0x14')]('Are\x20you\x20sure\x20you\x20want\x20to\x20update\x20username\x20\x27<b>'+user[a11_0x40fd('0x7')]+a11_0x40fd('0xb'));$(a11_0x40fd('0x0'))[a11_0x40fd('0x17')](a11_0x40fd('0x4'));});$(a11_0x40fd('0x1d'))['click'](_0x51f2a2=>{const _0x21dd39=user['id'];const _0x46deba=$(a11_0x40fd('0x1e'))[a11_0x40fd('0x9')]();const _0x5806b3=$(a11_0x40fd('0x18'))[a11_0x40fd('0x9')]();const _0x295839=$('#fname')[a11_0x40fd('0x9')]();const _0x19ead1=$('#lname')[a11_0x40fd('0x9')]();const _0x4276c8=user['admin'];$(a11_0x40fd('0x0'))['modal'](a11_0x40fd('0x1f'));$['ajax']({'type':a11_0x40fd('0x12'),'url':'api/user/update','data':{'id':_0x21dd39,'username':_0x46deba,'password':_0x5806b3,'fname':_0x295839,'lname':_0x19ead1,'admin':_0x4276c8},'success':function(_0x5ad03c){},'error':function(_0x29c744){alert(a11_0x40fd('0xa'),_0x29c744[a11_0x40fd('0x1b')]['msg']);}});});