const a10_0x5764=['-text','hide','#username','attr','click','#manage-user','modal','#password','empty','.modal-text','#admin','lname','append','#alert','val','.modal-title','#confirm-password','post','#fname','#lname','ajax','.modal\x20.btn-secondary','responseJSON','Update\x20\x27','msg','api/user/update','preventDefault','#manage-card','username','results','show','#myModal'];(function(_0x5decef,_0x445262){const _0x3ee0ff=function(_0x4e4694){while(--_0x4e4694){_0x5decef['push'](_0x5decef['shift']());}};_0x3ee0ff(++_0x445262);}(a10_0x5764,0x1ee));const a10_0x3aec=function(_0x5decef,_0x445262){_0x5decef=_0x5decef-0x0;let _0x3ee0ff=a10_0x5764[_0x5decef];return _0x3ee0ff;};function alert(_0x2de136,_0x539b35){$(_0x2de136)[a10_0x3aec('0x10')]();$(_0x2de136+a10_0x3aec('0x12'))['empty']();$(_0x2de136+'-text')[a10_0x3aec('0x1e')](_0x539b35);}let user={};$['ajax']({'type':a10_0x3aec('0x3'),'url':'api/user','data':{},'success':function(_0x2c5008){user=_0x2c5008[a10_0x3aec('0xf')];$(a10_0x3aec('0x14'))[a10_0x3aec('0x0')](_0x2c5008[a10_0x3aec('0xf')][a10_0x3aec('0xe')]);$(a10_0x3aec('0x19'))[a10_0x3aec('0x0')](_0x2c5008['results']['password']);$(a10_0x3aec('0x2'))[a10_0x3aec('0x0')](_0x2c5008[a10_0x3aec('0xf')]['password']);$(a10_0x3aec('0x4'))[a10_0x3aec('0x0')](_0x2c5008[a10_0x3aec('0xf')]['fname']);$(a10_0x3aec('0x5'))[a10_0x3aec('0x0')](_0x2c5008[a10_0x3aec('0xf')][a10_0x3aec('0x1d')]);$(a10_0x3aec('0x1c'))[a10_0x3aec('0x1e')](_0x2c5008[a10_0x3aec('0xf')]['admin']?'Yes':'No');},'error':function(_0x55d76d){$(a10_0x3aec('0x1f'))[a10_0x3aec('0x1a')]();$(a10_0x3aec('0x1f'))[a10_0x3aec('0x1e')](_0x55d76d[a10_0x3aec('0x8')][a10_0x3aec('0xa')]);}});$(a10_0x3aec('0x17'))['click'](_0x3f1580=>{_0x3f1580[a10_0x3aec('0xc')]();$(a10_0x3aec('0x7'))[a10_0x3aec('0x15')]('id','delete');$(a10_0x3aec('0x1'))[a10_0x3aec('0x1a')]();$(a10_0x3aec('0x1'))['append'](a10_0x3aec('0x9')+user[a10_0x3aec('0xe')]+'\x27?');$(a10_0x3aec('0x1b'))[a10_0x3aec('0x1a')]();$(a10_0x3aec('0x1b'))['append']('Are\x20you\x20sure\x20you\x20want\x20to\x20update\x20username\x20\x27<b>'+user[a10_0x3aec('0xe')]+'</b>\x27?');$(a10_0x3aec('0x11'))[a10_0x3aec('0x18')]('show');});$(a10_0x3aec('0x7'))[a10_0x3aec('0x16')](_0x599acf=>{const _0x518579=user['id'];const _0x152f64=$('#username')[a10_0x3aec('0x0')]();const _0xa60f6b=$(a10_0x3aec('0x19'))[a10_0x3aec('0x0')]();const _0x3df034=$('#fname')[a10_0x3aec('0x0')]();const _0x580173=$(a10_0x3aec('0x5'))[a10_0x3aec('0x0')]();const _0x3562ac=user['admin'];$(a10_0x3aec('0x11'))[a10_0x3aec('0x18')](a10_0x3aec('0x13'));$[a10_0x3aec('0x6')]({'type':a10_0x3aec('0x3'),'url':a10_0x3aec('0xb'),'data':{'id':_0x518579,'username':_0x152f64,'password':_0xa60f6b,'fname':_0x3df034,'lname':_0x580173,'admin':_0x3562ac},'success':function(_0x3641a9){},'error':function(_0x2ff9b3){alert(a10_0x3aec('0xd'),_0x2ff9b3['responseJSON'][a10_0x3aec('0xa')]);}});});