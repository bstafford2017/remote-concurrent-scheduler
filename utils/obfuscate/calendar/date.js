const a1_0x384c=['\x22\x20class=\x22row\x22>','\x22\x20class=\x22valid\x22>','getMonth','px;\x20height:\x20','hide','.row','#spinner','September','\x22\x20class=\x22active-date\x20valid\x22>','input[name=\x27selector\x27]:checked','click','<div\x20class=\x22invalid\x22>','#month','November','undefined','#by-month','remove','log','.valid','August','.scale\x20div','show','March','April','px;\x22>ACM\x20Meeting</div>','week','attr','.month-by-month','</div>','#myModal','<div\x20id=\x22row-','#row-','.week-by-week','val','append','<div\x20id=\x22','empty','getDay','<div\x20id=\x220\x22\x20class=\x22row\x22>','outerHeight','forEach','getDate','modal','.scale','getFullYear','December','October','June','slice','May','abs'];(function(_0x5e6593,_0x486e60){const _0x47f081=function(_0x184c59){while(--_0x184c59){_0x5e6593['push'](_0x5e6593['shift']());}};_0x47f081(++_0x486e60);}(a1_0x384c,0x140));const a1_0x12ab=function(_0x5e6593,_0x486e60){_0x5e6593=_0x5e6593-0x0;let _0x47f081=a1_0x384c[_0x5e6593];return _0x47f081;};const today=new Date();const months=['January','Febuary',a1_0x12ab('0x8'),a1_0x12ab('0x9'),a1_0x12ab('0x23'),a1_0x12ab('0x21'),'July',a1_0x12ab('0x5'),a1_0x12ab('0x2c'),a1_0x12ab('0x20'),a1_0x12ab('0x32'),a1_0x12ab('0x1f')];let currentMonth=today[a1_0x12ab('0x27')]();let currentYear=today[a1_0x12ab('0x1e')]();let currentDate=today[a1_0x12ab('0x1b')]()-0x1;let week=[0x0,0x0,0x0,0x0,0x0,0x0,0x0];$(a1_0x12ab('0x1d'))[a1_0x12ab('0x29')]();showMonthCalendar();$('#by-week')['click'](_0x3c00ef=>{clear();$(a1_0x12ab('0x1d'))[a1_0x12ab('0x7')]();showWeekCalendar();});$(a1_0x12ab('0x1'))[a1_0x12ab('0x2f')](_0x56830a=>{clear();$(a1_0x12ab('0x1d'))[a1_0x12ab('0x29')]();showMonthCalendar();});function clear(){$('.row')['remove']();$(a1_0x12ab('0xd'))[a1_0x12ab('0x16')]();$('#month')[a1_0x12ab('0x16')]();}function daysInMonth(){return 0x20-new Date(currentYear,currentMonth,0x20)[a1_0x12ab('0x1b')]();}function daysInNextMonth(){if(currentMonth-0x1<0x0){return 0x20-new Date(currentYear-0x1,0xb,0x20)[a1_0x12ab('0x1b')]();}else{return 0x20-new Date(currentYear,currentMonth-0x1,0x20)[a1_0x12ab('0x1b')]();}}function daysInPreviousMonth(){if(currentMonth-0x1<0xb){return 0x20-new Date(currentYear+0x1,0x0,0x20)[a1_0x12ab('0x1b')]();}else{return 0x20-new Date(currentYear,currentMonth-0x1,0x20)[a1_0x12ab('0x1b')]();}}function next(){if($(a1_0x12ab('0x2e'))[a1_0x12ab('0x13')]()===a1_0x12ab('0xb')){showWeekCalendar(!![]);}else{clear();currentYear=currentMonth===0xb?currentYear+0x1:currentYear;currentMonth=(currentMonth+0x1)%0xc;showMonthCalendar();}}function previous(){if(Math[a1_0x12ab('0x24')](week[0x0]-week[0x6])>0x7){if(currentMonth===0x0){currentMonth=0xb;currentYear--;}else{currentMonth--;}}if($('input[name=\x27selector\x27]:checked')[a1_0x12ab('0x13')]()==='week'){showWeekCalendar(![]);}else{clear();currentYear=currentMonth===0x0?currentYear-0x1:currentYear;currentMonth=currentMonth===0x0?0xb:currentMonth-0x1;showMonthCalendar();}}function changeHeader(_0x4892cc,_0x336976){$(a1_0x12ab('0x31'))[a1_0x12ab('0x16')]();$(a1_0x12ab('0x31'))[a1_0x12ab('0x14')](months[_0x4892cc]+'\x20'+_0x336976);}function addToHeader(_0x399ed3,_0x32f67c){$(a1_0x12ab('0x31'))['append']('/'+months[_0x399ed3]+'\x20'+_0x32f67c);}function changeAndCheck(_0x349899,_0x388f2a){_0x349899=_0x349899+_0x388f2a;if(_0x349899<0x0){changeHeader(currentMonth,currentYear);if(currentMonth===0x0){currentMonth=0xb;currentYear--;}else{currentMonth--;}_0x349899+=daysInMonth();addToHeader(currentMonth,currentYear);}else if(_0x349899>daysInMonth()){changeHeader(currentMonth,currentYear);_0x349899-=daysInMonth();if(currentMonth===0xb){currentMonth=0x0;currentYear++;}else{currentMonth++;}addToHeader(currentMonth,currentYear);}return _0x349899;}function printWeek(_0x256ecb){if(today[a1_0x12ab('0x1b')]()===_0x256ecb&today[a1_0x12ab('0x27')]()===currentMonth&&today[a1_0x12ab('0x1e')]()===currentYear){$('#0')[a1_0x12ab('0x14')]('<div\x20id=\x22'+_0x256ecb+'\x22\x20class=\x22active-date\x20valid\x22>'+_0x256ecb);}else{$('#0')[a1_0x12ab('0x14')](a1_0x12ab('0x15')+_0x256ecb+'\x22\x20class=\x22valid\x22>'+_0x256ecb);}$('#0')['append']('</div>');$('#'+_0x256ecb)[a1_0x12ab('0x14')]('<div\x20class=\x22week-event\x22\x20style=\x22margin-top:'+0x9*$(a1_0x12ab('0x6'))[a1_0x12ab('0x19')]()+a1_0x12ab('0x28')+$(a1_0x12ab('0x6'))[a1_0x12ab('0x19')]()+a1_0x12ab('0xa'));}function showWeekCalendar(_0x587191){$(a1_0x12ab('0x2a'))[a1_0x12ab('0x2')]();$(a1_0x12ab('0x12'))['append'](a1_0x12ab('0x18'));if(typeof _0x587191===a1_0x12ab('0x0')){if(week[0x0]===0x0){showWeekCalendar(!![]);}else{if(Math['abs'](week[0x0]-week[0x6])>0x7){changeHeader(currentMonth-0x1,currentYear);addToHeader(currentMonth,currentYear);}else{changeHeader(currentMonth,currentYear);}week[a1_0x12ab('0x1a')](_0x64a5c5=>printWeek(_0x64a5c5));}return;}let _0x2794f6=today[a1_0x12ab('0x1b')]()-today[a1_0x12ab('0x17')]();if(_0x2794f6<0x0){if(currentMonth===0x0){currentMonth=0xb;currentYear--;_0x2794f6=daysInMonth+_0x2794f6;}else{currentMonth--;_0x2794f6=daysInMonth+_0x2794f6;}}if(week[0x0]!==0x0){_0x2794f6=_0x587191?changeAndCheck(week[0x6],0x1):changeAndCheck(week[0x0],-0x7);}for(let _0x54a2a8=0x0;_0x54a2a8<0x7;_0x54a2a8++){week[_0x54a2a8]=_0x2794f6;printWeek(_0x2794f6);if(_0x54a2a8!==0x6){_0x2794f6=changeAndCheck(_0x2794f6,0x1);}}if(Math[a1_0x12ab('0x24')](week[0x0]-week[0x6])<=0x7){changeHeader(currentMonth,currentYear);}$(a1_0x12ab('0x12'))[a1_0x12ab('0x14')](a1_0x12ab('0xe'));}function printMonth(_0xd6d3b9,_0x3c3bb6,_0x2c3567,_0x59df67){if(_0xd6d3b9&&_0x3c3bb6){$(a1_0x12ab('0x11')+_0x2c3567)[a1_0x12ab('0x14')]('<div\x20id=\x22'+_0x59df67+a1_0x12ab('0x2d')+_0x59df67);}else if(_0x3c3bb6){$(a1_0x12ab('0x11')+_0x2c3567)[a1_0x12ab('0x14')](a1_0x12ab('0x15')+_0x59df67+a1_0x12ab('0x26')+_0x59df67);}else{$(a1_0x12ab('0x11')+_0x2c3567)[a1_0x12ab('0x14')](a1_0x12ab('0x30')+_0x59df67);}$('#row-'+_0x2c3567)['append'](a1_0x12ab('0xe'));if(_0x3c3bb6){$('#'+_0x59df67)[a1_0x12ab('0x14')]('<div\x20data-toggle=\x22tooltip\x22\x20data-placement=\x22top\x22\x20title=\x22Tooltip\x20on\x20top\x22\x20class=\x22month-event\x22>3pm\x20-\x20ACM\x20Meeting</div>');}}function showMonthCalendar(){changeHeader(currentMonth,currentYear);let _0x19205f=new Date(currentYear,currentMonth)[a1_0x12ab('0x17')]();let _0x14a63a=$(a1_0x12ab('0xd'));let _0x31e1a5=0x1;for(let _0x5acb9c=0x0;_0x5acb9c<0x6;_0x5acb9c++){if(_0x31e1a5<=daysInMonth()){_0x14a63a[a1_0x12ab('0x14')](a1_0x12ab('0x10')+_0x5acb9c+a1_0x12ab('0x25'));}let _0x2c7477=0x1;for(let _0x428d98=0x0;_0x428d98<0x7;_0x428d98++){if(_0x5acb9c===0x0&&_0x428d98<_0x19205f){printMonth(![],![],_0x5acb9c,daysInPreviousMonth()-(_0x19205f-_0x428d98)+0x1);}else if(_0x31e1a5>daysInMonth()){printMonth(![],![],_0x5acb9c,_0x2c7477);_0x2c7477++;}else{if(_0x31e1a5===today['getDate']()&&currentYear===today['getFullYear']()&&currentMonth===today[a1_0x12ab('0x27')]()){printMonth(!![],!![],_0x5acb9c,_0x31e1a5);}else{printMonth(![],!![],_0x5acb9c,_0x31e1a5);}_0x31e1a5++;}}if(_0x31e1a5<=daysInMonth()){_0x14a63a['append']('</div>');}if(_0x5acb9c===0x5){$(a1_0x12ab('0x2b'))[a1_0x12ab('0x29')]();}}}$(a1_0x12ab('0x4'))['on'](a1_0x12ab('0x2f'),_0x211caa=>{console[a1_0x12ab('0x3')](_0x211caa);let _0x31c8ef=$(_0x211caa['target'])[a1_0x12ab('0xc')]('id');let _0x4efe65=('0'+_0x31c8ef)[a1_0x12ab('0x22')](-0x2);let _0x5935b2=('0'+(currentMonth+0x1)%0xc)[a1_0x12ab('0x22')](-0x2);console[a1_0x12ab('0x3')](currentYear+'-'+_0x5935b2+'-'+_0x4efe65);$('#date')[a1_0x12ab('0x13')](currentYear+'-'+_0x5935b2+'-'+_0x4efe65);$(a1_0x12ab('0xf'))[a1_0x12ab('0x1c')]('show');});