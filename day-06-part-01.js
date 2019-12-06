class OrbitStructure {

  // this.objects represents each object in this map
  // this.relations is a list of all relations, child to parent
  constructor() {
    this.objects = new Set()
    this.relations = []        
  }

  push(identifier, child) {
    this.objects.add(identifier)
    this.objects.add(child)
    this.relations.push({
      parent: identifier,
      child: child
    })
  }

  // Return list of objects as array
  getAllObjects() {
    return [...this.objects]
  }

  // Get total number of direct and indirect orbits
  getAllOrbits(identifier) {
    let count = 0
    let pos = this.relations.findIndex(obj => {
      return obj.child === identifier
    })
    while (pos !== -1) {
      count++
      pos = this.relations.findIndex(obj => {
        return obj.child === this.relations[pos].parent
      })
    }
    return count
  }
}

const input = 'WLW)5M5,JG6)3KF,SMS)GFS,8G7)65P,R6X)HWB,23W)D4M,LTK)H8D,3KF)S3L,CWV)DFV,JZW)2M2,LBS)HTN,KMW)YHZ,FHF)ZVL,1MV)T1T,SBJ)LWR,42D)WZL,L1M)JG6,P7B)SSD,YSG)BYN,C56)2FM,7KH)9B4,98V)9SJ,XFQ)8FW,RTR)CB8,6PF)2W8,Q2G)5GN,4TP)56X,CXS)QJD,53B)XNG,98P)4PD,32F)XFQ,HXN)26Q,CGB)8W7,KVX)HP7,WH1)9SF,6TJ)6LP,3WN)1R8,SCB)LLR,9NZ)VHV,ZMJ)MWV,G8K)V4G,QFQ)8DX,SFM)R82,CC2)84G,J88)QG2,4LS)ZW3,P41)JCV,HZZ)CCN,F57)B3M,GRF)5YX,B4F)8VD,X6M)HRL,3CJ)H6W,H6W)YFP,CCN)42D,KGL)33T,QKZ)8FK,P3P)J64,965)68J,QJD)F21,QVJ)X9H,GKX)QR7,SWC)7RT,MWJ)C9J,9H4)MM4,D84)P43,8KV)K5M,8NH)2NJ,931)SWC,31V)F19,SCV)Y1R,3Y2)984,BX3)181,WDF)5GW,6BV)P4T,XS5)TVJ,6R6)8P1,S3L)9X1,LB3)DM2,GJ4)83G,COM)X6M,VXG)FDC,XFH)8XY,ZWS)7ZQ,2M2)31W,LRR)WYS,KVF)R69,K5L)L5L,3YT)J6S,7XC)HD9,XFL)7BK,HYM)KVF,5M5)42C,8YG)SF5,4JN)SCB,KLJ)F6J,6BB)VR9,SR6)3KC,MF4)43F,KT7)WQ7,CC3)MWJ,B3M)MLC,48K)6SR,JMZ)PJD,DMH)M8N,FWN)L2D,28G)F13,2G3)F7Y,YMY)ZMJ,2F9)9YR,YZR)NQJ,F6J)GX9,ZW3)3KY,68J)4TP,T6C)GDN,WK4)QSP,JXC)SCR,CW1)VXF,GMR)LW3,F6J)K19,NTR)B51,KXR)KGL,S1J)F1D,9W4)VYG,BQZ)RDL,2WQ)WRQ,3VP)B4F,ZMW)JBL,WF7)1H4,4SQ)V8N,QCN)4CP,P4C)71D,9YK)FN3,5M7)4J5,5VD)6BB,YN8)NYP,1B6)BY6,BYN)ML1,JTV)TRW,GWG)DV3,WGK)V1C,QGK)351,8Q3)6BV,2SR)TDX,3KC)P7L,MR4)QX7,R82)WC6,GMZ)D8L,7CS)QK5,QG2)RTR,5L1)CW1,6WN)9N2,KK6)1YR,5H4)SCZ,844)4JN,XJR)LDY,41D)MDD,9SF)GC2,P59)G7G,BWF)STV,16Z)R9K,D8L)NFH,64Z)1FX,965)QXB,78V)X4V,JR3)SRF,H5M)1G6,B51)7BG,WGT)DRW,SQP)V25,6JF)1PN,YHP)CMV,F2G)CVR,QDD)ZY1,PV8)WWZ,7D9)59V,LB1)FM4,XZV)3P1,YVC)WJW,D16)BVY,V1C)NSP,PJZ)G1C,BY2)4PL,MM4)LYT,H3L)BTH,9RR)GXR,QXN)2P8,B53)V8L,3P1)WN5,CND)VVQ,PXG)2JJ,7VL)VPK,CB8)V2T,9RC)RCR,NX4)RQ8,SWG)9W3,MCZ)CFV,G6B)TR7,SKP)86H,GX9)V6V,DN1)RGX,3WZ)WXY,KP2)FH7,LDY)12H,1TL)VJF,STM)5M6,H7Q)MFP,TDW)Q4F,F3X)9BM,FG3)WNY,LKV)2KD,K93)JHZ,L2D)794,LX6)B2M,RMB)7XG,W2P)W13,KC1)7KL,YCB)NZB,MPD)JTF,3RS)9Z6,RCR)378,QK1)LLJ,9Z6)28G,626)QWX,NYR)3G1,JV9)KH9,K9F)Q71,75T)7XC,4LS)YGH,5LK)7J8,3HJ)CGB,F39)H8X,WRQ)8TZ,YST)98P,ZKY)FHB,5M6)2BC,JSN)M8Y,7DS)JL7,LFG)DS5,TYG)Q1X,QXB)1P2,P7W)K4R,FT2)TBQ,G1C)MF4,42C)LVH,1MY)5G7,56Y)NML,W11)JDR,GMS)837,95M)MZY,359)VXG,967)N6G,V9W)RVP,QVG)3S3,XRR)TWP,FGK)7KH,74L)XYM,WGK)9PK,L23)6ZC,4BM)861,MDD)GQC,XV5)39N,YBK)F92,SDZ)PCJ,WD7)X3F,YQ9)YSG,P3X)XC7,4CP)5M7,8XY)7D9,7TH)ZMW,T84)S9P,J1J)KT7,BZV)GBS,88B)XG2,2JX)DGQ,D2L)W29,GDN)R6X,SR6)Y2J,TFS)ZZ8,12X)SQP,JYR)8KV,469)XS2,RSL)56Y,SHZ)B8T,K1G)TFS,2P8)74L,X9H)HW8,TR7)5H4,MYL)5VT,2Z8)CC2,7ZQ)3PH,KXR)6Y7,P5M)LJP,ZKF)9VC,WK4)N86,Y5Z)8FN,QD4)BV6,JQF)D38,BPX)W49,CJX)Y2Z,8X7)PQV,F21)QPM,W49)WY1,S6L)L23,777)S5F,S5F)DG6,7RT)6P3,V25)2G3,FD2)RJW,XFQ)75T,TDX)P9Q,G2N)H68,8TZ)931,TVJ)H3L,D4M)94J,QKZ)NV1,3G1)3RS,WQF)73R,KH9)53W,XJB)5XS,P96)HQT,1MJ)XGX,2KD)J6P,173)VF9,VHV)78V,L4J)146,XQR)JKB,TTH)2S2,9CK)48K,WQ7)R71,FSG)P2G,W13)RHR,DF3)P21,351)GMZ,BY2)PZ7,WRF)S1J,NMQ)5LK,Z2L)SSK,3KY)QCN,XKV)5F8,TR7)X29,FM4)XW6,V8N)C4F,4NR)N9S,NV1)7RJ,WD7)QK1,QX7)8RQ,LWQ)8MX,VVT)CJD,VJF)QK7,DD2)SAN,5J5)WLW,J6P)YHP,YSZ)J99,YFP)6F1,XWC)LRR,YP5)4HN,2FW)G8Z,YQC)XFL,L5L)KKJ,VXF)LQZ,MY2)8BZ,GXC)WMR,4CK)9Z5,CVN)2SR,6P6)QV2,VXV)GMY,39B)W4B,9Q8)VLG,C56)LTV,63Z)FTF,N86)XVC,H76)PJR,KLY)FZZ,JHZ)9RC,WYL)3YT,PJR)H5M,95M)WHP,G6L)1MV,7RJ)GWG,N9V)YBK,24G)FJS,GXC)H76,ZVV)2LN,G6C)YS6,CC1)WQF,GMS)9VW,HJP)JW5,SQP)YCB,R28)56C,FTW)JJJ,41J)M7F,XGG)KK6,R4B)S8J,8W2)P61,Q2K)Y8Z,F5T)YKB,6SR)SR6,PP1)XJH,8FW)M3H,R74)D2L,87C)7X3,5R4)WH1,R86)P7W,2LN)XGG,KP1)D73,2BC)ZLX,FGW)3QS,WRT)P7B,FKG)8GL,3FB)7DS,HRL)KMX,TX1)23W,WCW)BPX,VYG)R28,XPB)LB3,T8Q)598,P4C)N9V,P7Y)BQZ,33T)QXW,S9L)39B,F8M)9JQ,5V2)Y5Z,3S2)T6C,P59)64Z,DTW)JFB,2FM)X71,25T)DSV,TGS)WRT,S9P)7ZB,FR7)F3X,H8D)SKZ,P7L)NTR,KMP)PYF,3FD)NYR,BPF)J9H,JXC)PJZ,WPJ)XJB,6R2)V9W,7D4)MS1,NYP)R2J,VC5)1KB,NQJ)6LV,FJB)FSG,DRW)QHT,X71)3WN,7BK)N2F,RTC)HHT,1MY)BPF,YMY)63Z,H8D)6Z1,SKZ)G8K,Q71)SRM,VPK)7JX,XJH)HFT,BG7)JXC,XYM)Q9B,3RS)R4B,5F8)T63,8GL)W11,814)QKZ,QJD)SLY,FTZ)Q9W,HQT)GFV,ZP9)33R,RQ8)MYL,9VW)FWN,GFV)QMP,8RQ)B11,JJV)N8X,TNL)F7D,6ZC)CXS,7J9)7TH,837)Q8K,3T5)K3C,HQZ)QZ2,L3V)BCJ,59V)VZ1,TKB)GJ4,JZW)GLB,QRP)64V,Q1R)6JF,6MD)QPT,LHC)FGK,5XN)MCZ,73R)KMB,7XG)DTW,KTH)JJV,2W8)BTD,H74)S9L,7SZ)KMW,3S3)KP2,LHC)DCF,9N2)GXC,HBP)C8P,WJD)1TC,BSK)PGV,CL4)JZQ,HK3)W2P,GLB)TJN,1H4)KC1,L4L)359,W29)5VD,S6L)QDD,227)DF3,V3J)YP5,JL7)58W,6F1)9YK,7X3)L4N,8FK)K93,GXR)CK8,54B)CC3,DV3)K5L,XNG)WPJ,M8N)M1W,MR4)5S1,7ZB)GY3,GC2)X3J,XVC)1KC,Q1X)967,VR9)88X,DGQ)B2X,LZW)PFX,HD9)MP8,KTD)6YC,5G7)P5M,XG2)VN2,M68)54B,MFP)YH5,DM2)PNZ,MXY)G6C,J3G)L61,V1H)FTW,6YC)ZZQ,L11)SCV,3WN)Z72,M7F)N5Z,7BG)FK4,GB8)62Q,8MX)FTZ,LVH)DD2,L9X)SKP,SK2)MTZ,31W)LLG,4FH)RZW,JNQ)JYH,GJD)XJR,KGF)XS5,1KV)9W4,FQ5)6WN,XF3)8W2,W6L)8SF,TCL)PR1,HHT)1KV,7K5)G6B,XC7)ZTV,VXP)2JX,7K7)HZZ,C2L)FR7,N36)WGT,NZB)9VD,41K)3VP,BY6)4SQ,M9L)W5V,MZY)P4C,6P3)YN8,T34)TND,RQ8)GRQ,NML)QXN,598)4L7,1JT)V1H,58W)HJP,FZV)9WM,C9J)RN4,ZLX)LTK,8VD)F57,2JJ)Q58,X3F)ZWS,YDB)LBS,XS2)6P6,D73)814,9BR)GJQ,YS6)WQL,WXY)N57,NGY)TX1,5VZ)L4J,J64)XQR,29L)XQW,8BZ)2F9,P43)Q8D,B9S)H7P,QQC)XWC,GFS)TB8,XPD)LHC,5SH)41K,1P2)Q93,WN7)XV5,L4N)FQ5,WC6)TV1,D19)8YG,HFT)VXW,86J)CC1,5V2)V2P,BVY)5XN,PR1)65D,5YX)QJ1,3Y2)ZC2,N5Z)L45,6BF)Q3F,7PV)JV9,LB7)K5S,PCJ)FG3,GFV)9TB,QK5)DD6,T3V)7VL,D38)WCD,65D)WGK,N8X)Q2G,JW5)D84,YXY)7K5,CMV)9BR,P21)7YM,YKQ)NVK,ZQP)JTV,STV)32F,26Q)JWX,4HN)QR5,QTJ)P59,MZY)R86,ML1)LWQ,WRQ)MR4,Q33)ZDL,9BM)XZV,6ZC)BRB,YH5)TDW,K3C)7CS,64V)6R6,B11)SBN,WXK)WDF,L61)Q6D,8P1)VXV,15F)YZR,P4T)12X,Q9W)YST,QVL)SDZ,JTF)3S2,794)QGK,FJS)DN1,53W)31V,31T)GRF,JXS)B8Y,PYF)PXG,CFV)LX6,BCJ)SHZ,6P6)5R4,Y1R)WYL,N36)VXP,JFB)K4W,J2N)G1W,5VT)LZC,V2T)29L,84G)F2G,VK9)T48,RDL)WRF,N57)1MJ,G6C)FHF,HWX)PV8,N6G)LFG,5M7)CQ7,LZC)P6Y,CWX)QVJ,C8P)32J,KMX)SFM,VMS)TGS,V2P)C1C,1KB)777,BV6)9NZ,SSD)JZW,4J5)G6L,PX7)XQQ,FSG)2WQ,QSP)X9K,71D)HWX,P2G)WN7,WZL)KVX,ZVL)XGQ,DSV)QVL,NQG)WCW,TJ1)3FB,VZ1)BY2,BTD)T57,WCD)TJ1,26Q)KVD,FD2)3PZ,56C)85X,1WC)4BM,PJD)84R,TRW)4YJ,ZY1)SK2,TD5)QVG,G3K)KXR,R2J)9SQ,PNZ)B53,KCN)FPS,P61)KXG,ZCW)L9X,4M7)1GM,QWX)2XP,Y7D)WJD,4HR)1PD,MJX)FD2,K5M)NQH,QXW)QZS,MYK)MBJ,181)NYN,VXW)626,JJJ)ZJB,LTV)39C,V1N)Z8L,VVQ)F8M,8FN)NGY,X3J)K9F,XQW)SBJ,VF9)1TL,PJZ)LB7,CJD)8H5,MS1)7K7,8SF)JMZ,RVP)469,F7D)MJX,DCN)WF7,SHS)6PF,TK2)6CV,M3H)9RR,X4V)BZV,TJN)25T,NSP)8KM,WF3)HXN,GBQ)PSZ,1TC)KLJ,QPM)GKX,P4T)LBQ,LQZ)FS8,NH7)FVX,B2M)P3M,LBV)1B6,1FX)6M8,1G6)W6L,98P)VC5,XGX)JLM,X3F)714,X9K)7QX,XQ7)SWG,Z72)YSZ,714)TCL,JKB)DCN,V6V)68R,DCF)FT2,43F)NH7,6M8)ZF3,R28)SMS,HQT)MGG,T57)XRR,9VC)J2P,TB8)9H4,3PZ)JR3,65D)L1M,M55)XZ7,QK7)MPD,QZS)3FD,CQ7)4PZ,Q6D)2T4,N9S)XP6,2XY)BSK,J88)95M,37K)M9L,FK4)YVC,SLY)P96,B9Y)KLY,HW8)LJ2,1PD)3Y2,S8J)RSL,FHM)7PV,Y2J)8W3,1KC)PZZ,SBN)C56,ZDL)3FX,JDR)L4L,JYS)7SZ,1KP)FKG,MTZ)DHS,Q9B)5V2,9JQ)98V,FVX)F5T,BTH)PPD,H68)CWV,2S2)3HJ,63D)ZP9,45B)NX4,JWX)JYR,ZZQ)4FH,F13)ZHR,GQC)G2N,WMR)88B,GRQ)YMY,7KL)GB8,L2D)NMQ,ZTV)53B,LLJ)CVN,VZH)J2N,H3Q)965,9Z5)YOU,Q8D)L11,Q3F)ZPG,32J)TKB,F92)9Q8,K5L)463,V4G)6R2,P9Q)ZCW,6Z1)R74,WNY)J1J,MKH)ZFF,HSP)LJ9,QR5)BLS,J54)8Q3,MWV)4LS,8KM)N36,984)FDN,SF5)HYM,ZFF)132,7YM)5VZ,PQV)6BF,7KF)L3V,PZ7)1JT,SVP)HQZ,9VD)1WC,4QF)HSP,3PH)7KF,B8Y)NK4,J99)WK4,Y7D)C2L,PFX)S6L,FS8)LB1,JBL)BX3,8W7)KCN,7J8)TNL,66W)GBQ,QPT)87C,XS5)DY7,NTT)YKQ,9WM)H74,KKJ)45B,QR7)P3P,TBQ)JNQ,9SQ)JQF,PXG)QD4,NX4)H7Q,861)H9Q,LLR)QTJ,HF5)NR8,WY1)5L1,4PZ)G3K,MGG)6TJ,FH7)PX7,VZG)XPB,68R)QQC,MTZ)XQ7,HCF)MZ3,CC1)117,62Q)4Z9,113)SBC,Q93)GMS,JZQ)4K1,QHT)P8L,TV1)WD7,P8L)J3G,39C)MY2,K5S)3CJ,JYH)2FW,PSZ)4QF,6Y7)M33,V75)LKV,SBC)M55,Q1R)7J9,DFV)SVP,P2C)HF5,F7Y)Z2L,Q8K)8NH,9PK)J54,MD6)VK9,JXV)STM,ZC2)P41,3PZ)T3V,Y8Z)J88,33R)3T5,LW3)Q1R,J1J)HK3,G8Z)NQL,ZF3)15F,QMP)K1G,LJP)YXY,QV2)227,Y5Z)JYS,FTF)KMP,V6V)VZG,56X)XPD,NK4)2XY,6LP)ZQP,J2P)YRL,P9Q)ZKY,HWB)VZH,P3M)1KP,C1C)Q2K,K4R)V1N,4PL)NQG,RR5)1W1,RHR)DFZ,MZ3)NW1,FN3)5SH,2NJ)4CK,H8X)KTH,FDN)F39,9YR)KTD,QZ2)6ZP,GJQ)KP1,NYP)844,C4F)BWF,NV1)2Z8,Q58)RMB,CHB)M68,DS5)YQ9,VVT)RTC,X29)41J,RN4)63D,XZ7)HBP,DHS)31T,H7P)KQ9,JCV)KSP,F2Q)4NR,83G)KDV,WWZ)JTY,8DX)TD5,FPS)XFH,L45)T8Q,C1C)9CK,HTN)T4F,CHG)YDB,T48)TK2,T2K)Y7D,G1W)SSW,1PN)FHM,SSW)Q33,LLG)NTT,XGQ)XF3,4PD)4M7,YRL)CHB,CK8)R61,LYT)CL4,5S1)V3J,CC3)VVT,RGX)V33,ZZ8)QRP,WN5)SZJ,RQ3)7PY,VN2)V75,132)RQ3,4Z9)FZV,FZZ)MXY,6ZP)LZW,DG6)WF3,88X)QFQ,8H5)KGF,F13)P2C,1W1)LBV,Z8L)J8D,PV4)D16,6CV)TTH,MBJ)FVC,NYN)P7Y,G7G)B9S,23W)16Z,7K5)D19,Y2Z)ZVV,PZZ)1MY,JVM)XKV,P6Y)37K,QZ2)24G,XPD)GJD,WH1)86L,1YR)173,5XS)GMR,CL4)6LT,QXW)FGW,FDC)7D4,NVK)P3X,H74)RR5,SRF)113,463)TYG,HP7)WXK,117)SHS,F1D)6MD,DD6)DMH,86L)86J,BRB)CHG,146)H3Q,B2X)T84,NR8)JVM,YGH)F2Q,1GM)PP1,R9K)MYK,XW6)8X7,TCL)4HR,7JX)YQC,ZPG)PV4,2T4)FJB,KQ9)881,39C)B9Y,W4B)5J5,TFS)T2K,KVD)JSN,M1W)CJX,HWX)3WZ,5GW)JXV,VLG)BG7,GDN)JXS,3FX)41D,7KH)MKH,12H)CWX,4K1)CND,86H)T34,M8Y)MD6,39N)8G7,PPD)HCF,J6S)VMS,R71)ZKF,WN5)66W'
let orbitMap = new OrbitStructure

input.split(',').forEach(relation => {
  orbitMap.push(relation.split(')')[0], relation.split(')')[1])
})

// Get sum
orbitMap.getAllObjects().reduce((total, object) => {
  return total + orbitMap.getAllOrbits(object)
}, 0)
