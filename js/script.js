const $ = id => document.getElementById(id);
const defaults = {width:220,height:68,radius:24,fontSize:16,label:"Fluid Glass",glyph:"✦",tilt:0,blur:16,alpha:19,tint:"#b9b4ff",angle:135,shine:75,border:42,shadow:28,position:"center",backdrop:"aurora"};
const keys = Object.keys(defaults);
function hexRgb(hex){const h=hex.replace("#","");if(!/^[0-9a-fA-F]{6}$/.test(h))return [185,180,255];return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]}
function read(){const s={};for(const k of keys){const el=$(k);s[k]=el.type==="range"?Number(el.value):el.value}return s}
function update(){
 const s=read(), b=$("glassButton"), rgb=hexRgb(s.tint);
 b.style.setProperty("--w",s.width+"px");b.style.setProperty("--h",s.height+"px");b.style.setProperty("--radius",s.radius+"px");b.style.setProperty("--blur",s.blur+"px");b.style.setProperty("--alpha",s.alpha/100);b.style.setProperty("--tint",rgb.join(","));b.style.setProperty("--angle",s.angle+"deg");b.style.setProperty("--shine",s.shine/100);b.style.setProperty("--border",s.border/100);b.style.setProperty("--shadow",s.shadow/100);b.style.setProperty("--tilt",s.tilt+"deg");b.style.fontSize=s.fontSize+"px";
 $("buttonLabel").textContent=s.label||"Button";$("buttonGlyph").textContent=s.glyph==="none"?"":s.glyph;
 const units={width:"px",height:"px",radius:"px",fontSize:"px",tilt:"°",blur:"px",alpha:"%",angle:"°",shine:"%",border:"%",shadow:"%"};
 for(const k of Object.keys(units))$(k+"Val").textContent=s[k]+units[k];
 $("tintHex").value=s.tint;
 const stage=$("stage"),wrap=document.querySelector(".preview-wrap");
 wrap.style.justifyItems=s.position==="left"?"start":s.position==="right"?"end":"center";
 if(s.backdrop==="light"){stage.style.backgroundImage="radial-gradient(ellipse at 20% 20%,#d8d5ed,transparent 45%),linear-gradient(135deg,#f0f1f5,#c8ceda)";stage.style.backgroundColor="#d9deea";b.style.color="#fff"}
 else if(s.backdrop==="dark"){stage.style.backgroundImage="linear-gradient(135deg,#15171d,#050609)";stage.style.backgroundColor="#090a0d"}
 else if(s.backdrop==="purple"){stage.style.backgroundImage="radial-gradient(ellipse at 25% 25%,#554078,transparent 50%),linear-gradient(135deg,#21192f,#100f1b)";stage.style.backgroundColor="#171224"}
 else {stage.style.backgroundImage="radial-gradient(ellipse at 20% 20%,#7775a544,transparent 35%),radial-gradient(ellipse at 80% 70%,#58b9bd33,transparent 34%),linear-gradient(135deg,#252a36,#10131b 65%)";stage.style.backgroundColor="#171b25"}
 $("cssOutput").textContent=`.fluid-glass-button {\n  width: ${s.width}px;\n  height: ${s.height}px;\n  border-radius: ${s.radius}px;\n  border: 1px solid rgba(255, 255, 255, ${s.border/100});\n  background: linear-gradient(${s.angle}deg,\n    rgba(255,255,255,${(s.shine/100*.32).toFixed(2)}),\n    rgba(${rgb.join(", ")},${(s.alpha/100).toFixed(2)}) 35%,\n    rgba(255,255,255,${(s.shine/100*.07).toFixed(2)}) 70%,\n    rgba(${rgb.join(", ")},${(s.alpha/100*.7).toFixed(2)}));\n  backdrop-filter: blur(${s.blur}px) saturate(155%);\n  -webkit-backdrop-filter: blur(${s.blur}px) saturate(155%);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,${(s.shine/100*.72).toFixed(2)}),\n    0 16px 42px rgba(0,0,0,${(s.shadow/100).toFixed(2)});\n  color: #fff;\n  font-size: ${s.fontSize}px;\n  font-weight: 650;\n  transform: perspective(800px) rotate(${s.tilt}deg);\n}`;
}
function toast(msg="Berhasil disalin ✨"){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1800)}
async function copy(text){try{await navigator.clipboard.writeText(text);toast()}catch(e){const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();try{document.execCommand("copy");toast()}catch(_){toast("Salin manual dari panel kode")};ta.remove()}}
for(const k of keys){$(k).addEventListener("input",update);$(k).addEventListener("change",update)}
$("tint").addEventListener("input",()=>{$("tintHex").value=$("tint").value;update()});
$("tintHex").addEventListener("change",()=>{if(/^#[0-9a-fA-F]{6}$/.test($("tintHex").value)){$("tint").value=$("tintHex").value;update()}else{$("tintHex").value=$("tint").value}});
$("copyCss").addEventListener("click",()=>copy($("cssOutput").textContent));
$("copyCode").addEventListener("click",()=>copy($("cssOutput").textContent));
$("copyHtml").addEventListener("click",()=>{const s=read();copy(`<button class="fluid-glass-button" type="button">${s.glyph==="none"?"":s.glyph+" "}${s.label||"Button"}</button>`)});
$("reset").addEventListener("click",()=>{for(const k of keys)$(k).value=defaults[k];update();toast("Desain direset ✨")});
$("glassButton").addEventListener("click",()=>{toast("Tombol preview berfungsi ✨")});
update();
