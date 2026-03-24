export const RECITERS = {
  alafasy:{folder:"Alafasy_128kbps",name:{en:"Mishary al-Afasy",tr:"Mişârî el-Afâsî"}},
  husary:{folder:"Husary_128kbps",name:{en:"Mahmud al-Husary",tr:"Mahmûd el-Husarî"}},
  sudais:{folder:"Abdurrahmaan_As-Sudais_192kbps",name:{en:"As-Sudais",tr:"es-Sudeys"}},
};
export const ayahUrl = (r,s,a) => `https://everyayah.com/data/${RECITERS[r].folder}/${String(s).padStart(3,"0")}${String(a).padStart(3,"0")}.mp3`;


