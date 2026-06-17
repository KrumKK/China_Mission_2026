/**
 * CISCE 2026 — Datos de empresas priorizadas (Build 46)
 * Fuente: CISCE2026_Priorizacion_v4_VERIFICADA_EN_2026-06-15
 * 
 * Estructura: 3 bloques → Joint Venture (18) · Diversificación (11) · Apoyo (7)
 */

const CISCE_JV = [
  {
    id: 'cisce-jv-01',
    name: 'Bosch (China)',
    nameZh: '',
    potencial: 'Alto',
    fuente: 'Krum',
    encaje: 'Tier-1 global de EPS/dirección y mecatrónica. No es socio de JV (competidor), pero es LA referencia técnica y posible socio tecnológico en electrónica de dirección — objetivo explícito de la Memoria.',
    queHace: 'Tier-1 global; fabrica EPS, dirección, chasis, sensores y mecatrónica.',
    veredicto: 'Confirmado',
    stand: 'E2-C04'
  },
  {
    id: 'cisce-jv-02',
    name: 'Hefei Yitong',
    nameZh: '一通电子',
    potencial: 'Medio-Alto',
    fuente: 'Krum',
    encaje: 'Electrónica de vehículo (arquitectura EEA, control de carrocería). Perfil de socio en electrónica de dirección y proveedor de componentes para EPS de nueva generación.',
    queHace: 'No confirmé la ficha específica en web. El segmento (electrónica de vehículo/EEA) es relevante para EPS, pero hay que verificar a qué se dedica exactamente.',
    veredicto: 'POR REVISAR',
    stand: ''
  },
  {
    id: 'cisce-jv-03',
    name: 'ARITEX Shanghai',
    nameZh: '埃瑞泰克斯',
    potencial: 'Medio',
    fuente: 'Oscar',
    encaje: 'Automatización de líneas de ensamblaje (ESPAÑOLA). Encaja en automatizar la futura línea de remanufactura en China; conversación en español. Socio de implementación industrial.',
    queHace: 'Española de origen pero PROPIEDAD CHINA (AVIC, 95%, desde 2016). Líneas de ensamblaje OEM de gran volumen; probablemente sobredimensionada para reman. Baja de Alto a Medio.',
    veredicto: 'AJUSTADO',
    stand: 'W3-D01'
  },
  {
    id: 'cisce-jv-04',
    name: 'Dongguan EONTEC',
    nameZh: '宜安科技',
    potencial: 'Medio',
    fuente: 'Ambos',
    encaje: 'Fundición Mg-Al de precisión para auto/EV. Posible proveedor de carcasas para sistemas EPS y socio de fabricación local. (Identificada por ambos.)',
    queHace: 'Fundición de precisión Mg/Al para automoción (cotizada 300328, premio IMA). Proveedor de carcasas/estructura.',
    veredicto: 'Confirmado',
    stand: 'E2-D05'
  },
  {
    id: 'cisce-jv-05',
    name: 'Geely',
    nameZh: '吉利控股',
    potencial: 'Medio',
    fuente: 'Krum',
    encaje: 'OEM gigante multimarca (Volvo, Lotus, Zeekr). Cliente/relación de alto valor para suministro EPS y mapeo de cascos de remanufactura.',
    queHace: 'Geely: OEM gigante (Volvo, Lotus, Zeekr). Cliente/relación.',
    veredicto: 'Confirmado',
    stand: 'E2-A01'
  },
  {
    id: 'cisce-jv-06',
    name: 'PIX Moving',
    nameZh: '翰凯斯',
    potencial: 'Medio',
    fuente: 'Oscar',
    encaje: 'Único expositor con AMR confirmado. Producto directamente comercializable: encaje de lleno en distribución de AGV/AMR.',
    queHace: 'NO es AMR de almacén: city-robotics (RoboBus/Taxi/Shop) con chasis DRIVE-BY-WIRE y CAN abierto. Vale más como inteligencia de Obj1 (steer/drive-by-wire) que como distribución.',
    veredicto: 'AJUSTADO',
    stand: ''
  },
  {
    id: 'cisce-jv-07',
    name: 'Seres / AITO',
    nameZh: '赛力斯',
    potencial: 'Medio',
    fuente: 'Krum',
    encaje: 'OEM NEV (alianza Huawei/AITO). Cliente potencial de remanufactura EPS certificada; demanda en el ecosistema EV objetivo.',
    queHace: 'Seres: OEM NEV (marca AITO, alianza Huawei). Cliente potencial.',
    veredicto: 'Confirmado',
    stand: 'E2-C01'
  },
  {
    id: 'cisce-jv-08',
    name: 'Dongfeng',
    nameZh: '东风',
    potencial: 'Bajo-Medio',
    fuente: 'Krum',
    encaje: 'OEM estatal. Cliente potencial y contacto institucional.',
    queHace: 'Dongfeng: OEM estatal. Cliente/contacto institucional.',
    veredicto: 'Confirmado',
    stand: ''
  },
  {
    id: 'cisce-jv-09',
    name: 'Lens Technology',
    nameZh: '蓝思科技',
    potencial: 'Medio-Bajo',
    fuente: 'Oscar',
    encaje: 'Manufactura de precisión para vehículos y robótica. Posible proveedor de la cadena de suministro electrónica/mecánica.',
    queHace: 'Lens Technology: manufactura de precisión para dispositivos/auto/robótica (cotizada). Proveedor.',
    veredicto: 'Confirmado',
    stand: ''
  },
  {
    id: 'cisce-jv-10',
    name: 'Volvo Cars',
    nameZh: '',
    potencial: 'Medio-Bajo',
    fuente: 'Krum',
    encaje: 'OEM premium (grupo Geely). Cliente/relación.',
    queHace: 'Volvo Cars: OEM premium (grupo Geely). Cliente.',
    veredicto: 'Confirmado',
    stand: 'E2-A02'
  },
  {
    id: 'cisce-jv-11',
    name: 'Anhui Haofang',
    nameZh: '昊方机电',
    potencial: 'Bajo',
    fuente: 'Krum',
    encaje: 'Embragues A/C y fundición de precisión. Proveedor potencial de fundición.',
    queHace: 'Embragues A/C + fundición de precisión (según CISCE); no confirmado en web.',
    veredicto: 'POR REVISAR',
    stand: ''
  },
  {
    id: 'cisce-jv-12',
    name: 'China Automotive Battery Research Institute',
    nameZh: '国联',
    potencial: 'Bajo',
    fuente: 'Oscar',
    encaje: 'I+D de baterías EV. Valor de inteligencia de mercado EV, no de JV.',
    queHace: 'Instituto nacional de I+D de baterías EV. Valor de inteligencia de mercado.',
    veredicto: 'Confirmado',
    stand: ''
  },
  {
    id: 'cisce-jv-13',
    name: 'Clúster Auto Shenyang',
    nameZh: '沈阳',
    potencial: 'Bajo',
    fuente: 'Krum',
    encaje: 'Clúster auto de Shenyang (BMW Brilliance, Bekaert...). Networking sectorial.',
    queHace: 'Clúster auto de Shenyang (según CISCE). Networking; contenido por confirmar.',
    veredicto: 'POR REVISAR',
    stand: 'E2-B02'
  },
  {
    id: 'cisce-jv-14',
    name: 'Hengdian DB Lighting',
    nameZh: '得邦照明',
    potencial: 'Bajo',
    fuente: 'Krum',
    encaje: 'Electrónica y controladores de coche; suministra a Geely/Leapmotor/Nissan/Toyota. Tangencial.',
    queHace: 'Iluminación de coche + controladores (según CISCE); detalle no confirmado. Tangencial.',
    veredicto: 'POR REVISAR',
    stand: ''
  },
  {
    id: 'cisce-jv-15',
    name: 'JMC NEV',
    nameZh: '江铃',
    potencial: 'Bajo',
    fuente: 'Krum',
    encaje: 'OEM (JMC), exporta a 40+ países. Cliente potencial.',
    queHace: 'JMC: OEM. Cliente potencial.',
    veredicto: 'Confirmado',
    stand: 'E2-A06'
  },
  {
    id: 'cisce-jv-16',
    name: 'Leapmotor',
    nameZh: '零跑',
    potencial: 'Bajo',
    fuente: 'Krum',
    encaje: 'OEM EV (Leapmotor), full-stack propio. Cliente potencial.',
    queHace: 'Leapmotor: OEM EV. Cliente potencial.',
    veredicto: 'Confirmado',
    stand: ''
  },
  {
    id: 'cisce-jv-17',
    name: 'Momenta',
    nameZh: '魔门塔',
    potencial: 'Bajo',
    fuente: 'Oscar',
    encaje: 'IA de conducción autónoma. Inteligencia sobre la hoja de ruta EPS/Steer-by-Wire de los OEMs (clientes SAIC, Mercedes, Toyota, Bosch).',
    queHace: 'Momenta: IA de conducción autónoma. Inteligencia sobre roadmap EPS/by-wire de OEMs.',
    veredicto: 'Confirmado',
    stand: ''
  },
  {
    id: 'cisce-jv-18',
    name: 'XPeng',
    nameZh: '小鹏',
    potencial: 'Bajo',
    fuente: 'Krum',
    encaje: 'OEM EV (XPeng). Relación/cliente potencial; relevante para by-wire futuro.',
    queHace: 'XPeng: OEM EV. Cliente potencial.',
    veredicto: 'Confirmado',
    stand: 'E2-A05'
  }
];

const CISCE_DIV = [
  {
    id: 'cisce-div-01',
    name: 'Suzhou Junduo / JODELL Robotics',
    nameZh: '钧舵',
    potencial: 'Alto',
    fuente: 'Krum',
    encaje: 'Actuadores eléctricos y manos diestras; YA exporta a EU/EE.UU./Asia. Abierto a distribuidores — encaje directo.',
    queHace: 'Pinzas eléctricas y manos diestras; filial en Singapur, internacionalizando. Encaje directo de distribución.',
    veredicto: 'Confirmado',
    stand: ''
  },
  {
    id: 'cisce-div-02',
    name: 'Zhejiang Huandong Robot Joint Tech',
    nameZh: '环动',
    potencial: 'Alto',
    fuente: 'Krum',
    encaje: 'Reductores de precisión (RV/armónico/cicloidal) y actuadores para robots/humanoides. Componente clave; candidato fuerte a distribución en el sur de Europa.',
    queHace: 'Reductores RV/armónico/cicloidal (grupo Shuanghuan). Componente que Europa importa → encaje fuerte de distribución.',
    veredicto: 'Confirmado',
    stand: ''
  },
  {
    id: 'cisce-div-03',
    name: 'MagicLab',
    nameZh: '魔法原子',
    potencial: 'Medio-Alto',
    fuente: 'Krum',
    encaje: 'Humanoides con módulos articulares, manos y reductores propios. Partner de distribución emergente.',
    queHace: 'Humanoides+cuadrúpedos+manos diestras, 90% HW propio; 60% ventas internacionales en 50+ países, con programa de partners. Sube a Medio-Alto.',
    veredicto: 'Confirmado',
    stand: ''
  },
  {
    id: 'cisce-div-04',
    name: 'Unitree Robotics',
    nameZh: '宇树科技',
    potencial: 'Medio-Alto',
    fuente: 'Oscar',
    encaje: 'Humanoides y cuadrúpedos de referencia mundial, con modelo de venta accesible. Posible producto de catálogo para distribución.',
    queHace: 'Unitree: humanoides/cuadrúpedos de referencia mundial, venta accesible. Posible catálogo de distribución.',
    veredicto: 'Confirmado',
    stand: 'W2-B05'
  },
  {
    id: 'cisce-div-05',
    name: 'Ninebot / Segway',
    nameZh: '九号公司',
    potencial: 'Medio',
    fuente: 'Oscar',
    encaje: 'Plataformas móviles y robots de servicio. Producto comercializable (servicio/última milla).',
    queHace: 'Ninebot/Segway: movilidad y robots de servicio (cotizada 689009). Producto de servicio comercializable.',
    veredicto: 'Confirmado',
    stand: 'E4-C12'
  },
  {
    id: 'cisce-div-06',
    name: 'Shanghai FANUC Robotics',
    nameZh: '发那科',
    potencial: 'Medio',
    fuente: 'Oscar',
    encaje: 'Cobots y robots industriales líderes. Difícil conseguir distribución (marca enorme), pero referencia para el catálogo de cobots.',
    queHace: 'El mayor fabricante mundial de robots industriales/cobots. Referencia; distribución improbable.',
    veredicto: 'Confirmado',
    stand: ''
  },
  {
    id: 'cisce-div-07',
    name: 'UBTECH Robotics',
    nameZh: '优必选',
    potencial: 'Medio',
    fuente: 'Oscar',
    encaje: 'Humanoides líder (9880.HK). Alto perfil; distribución improbable a corto plazo pero clave para leer el mercado.',
    queHace: 'UBTECH: líder en humanoides (9880.HK). Alto perfil; distribución difícil a corto.',
    veredicto: 'Confirmado',
    stand: ''
  },
  {
    id: 'cisce-div-08',
    name: 'Wuhan WeiLiSense Sensing Tech',
    nameZh: '维力传感',
    potencial: 'Bajo-Medio',
    fuente: 'Oscar',
    encaje: 'Sensores de fuerza para robots. Componente de nicho para distribución.',
    queHace: 'Sensores de fuerza para robots (según CISCE); plausible pero no confirmado. Componente de nicho.',
    veredicto: 'POR REVISAR',
    stand: ''
  },
  {
    id: 'cisce-div-09',
    name: 'Beijing Longwood Valley Medical',
    nameZh: '长木谷',
    potencial: 'Bajo',
    fuente: 'Oscar',
    encaje: 'Robots quirúrgicos ortopédicos. Nicho médico, fuera del canal de Lizarte.',
    queHace: 'Beijing Longwood: robots quirúrgicos ortopédicos con IA (FDA/CE). Nicho médico, fuera del canal Lizarte.',
    veredicto: 'Confirmado',
    stand: 'E3-A12'
  },
  {
    id: 'cisce-div-10',
    name: 'Guizhou GongJiangHang Technology',
    nameZh: '工匠行',
    potencial: 'Bajo',
    fuente: 'Oscar',
    encaje: 'IA aplicada a robótica, perfil poco definido. Explorar.',
    queHace: 'IA aplicada a robótica (según Oscar/CISCE), perfil poco definido; no confirmado en web.',
    veredicto: 'POR REVISAR',
    stand: ''
  },
  {
    id: 'cisce-div-11',
    name: 'Wuxi Langdi',
    nameZh: '朗迪测控',
    potencial: 'Bajo',
    fuente: 'Krum',
    encaje: 'Equipos de test de reductores/actuadores. Complemento técnico, no producto de catálogo.',
    queHace: 'Equipos de test de reductores/actuadores (según CISCE); no confirmado.',
    veredicto: 'POR REVISAR',
    stand: ''
  }
];

const CISCE_APOYO = [
  {
    id: 'cisce-apoyo-01',
    name: 'Corning',
    nameZh: '康宁',
    potencial: 'Apoyo',
    fuente: 'Oscar',
    encaje: 'Materiales especiales (vidrio/cerámica/óptica). Contexto, no objetivo.',
    queHace: 'Corning: materiales (vidrio/óptica). Apoyo.',
    veredicto: 'Confirmado',
    stand: ''
  },
  {
    id: 'cisce-apoyo-02',
    name: 'FedEx China',
    nameZh: '联邦快递',
    potencial: 'Apoyo',
    fuente: 'Oscar',
    encaje: 'Logística express. Envío de muestras/repuestos.',
    queHace: 'FedEx: logística express. Apoyo.',
    veredicto: 'Confirmado',
    stand: 'W4-A08'
  },
  {
    id: 'cisce-apoyo-03',
    name: 'Mezolen Instruments Changzhou',
    nameZh: '美卓伦',
    potencial: 'Apoyo',
    fuente: 'Oscar',
    encaje: 'Instrumentación (medidores de caudal), raíz española (Tarragona). Contacto cordial.',
    queHace: 'Instrumentación (medidores de caudal), raíz española (Tarragona); detalle no confirmado. Apoyo.',
    veredicto: 'POR REVISAR',
    stand: 'W3-D11'
  },
  {
    id: 'cisce-apoyo-04',
    name: 'NVIDIA',
    nameZh: '英伟达',
    potencial: 'Apoyo',
    fuente: 'Oscar',
    encaje: 'IA/GPU, plataforma de robótica y gemelos digitales. Referencia para el proyecto IA interno.',
    queHace: 'NVIDIA: IA/GPU/robótica (Isaac, Omniverse). Apoyo/contexto.',
    veredicto: 'Confirmado',
    stand: ''
  },
  {
    id: 'cisce-apoyo-05',
    name: 'Novelis Aluminum Zhenjiang',
    nameZh: '诺贝丽斯',
    potencial: 'Apoyo',
    fuente: 'Oscar',
    encaje: 'Aluminio plano para automoción/aeronáutica. Tendencias de materiales ligeros.',
    queHace: 'Novelis: aluminio plano reciclado para automoción. Apoyo/materiales.',
    veredicto: 'Confirmado',
    stand: ''
  },
  {
    id: 'cisce-apoyo-06',
    name: 'Schneider Electric China',
    nameZh: '施耐德',
    potencial: 'Apoyo',
    fuente: 'Oscar',
    encaje: 'Automatización industrial y energía. Útil para planta, no objetivo de misión.',
    queHace: 'Schneider Electric: automatización industrial y energía. Apoyo.',
    veredicto: 'Confirmado',
    stand: ''
  },
  {
    id: 'cisce-apoyo-07',
    name: 'iFLYTEK',
    nameZh: '科大讯飞',
    potencial: 'Apoyo',
    fuente: 'Oscar',
    encaje: 'IA de voz/NLP. Digitalización de procesos internos.',
    queHace: 'iFLYTEK: IA de voz líder en China (002230). Apoyo.',
    veredicto: 'Confirmado',
    stand: ''
  }
];

window.CISCE_JV = CISCE_JV;
window.CISCE_DIV = CISCE_DIV;
window.CISCE_APOYO = CISCE_APOYO;
