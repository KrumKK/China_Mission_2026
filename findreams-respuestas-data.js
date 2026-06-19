/**
 * Respuestas Técnicas Anticipadas — FinDreams / BYD
 * 16 preguntas · Castellano + 中文 + English
 * Para usar como desplegable en la ficha icex-canton-01
 */

const FINDREAMS_RESPUESTAS = [
  {
    id: 'PA-01',
    titulo: 'Codificación y emparejamiento de la ECU',
    escenario: 'Remanufactura',
    es: 'Más allá del flashing de versión, gestionamos el emparejamiento de la unidad con el vehículo cuando el procedimiento del fabricante lo permite. Tras el reacondicionamiento cargamos la versión correspondiente a la configuración original y, si la referencia requiere variant coding o sincronización con el VIN/inmovilizador, lo ejecutamos siguiendo el procedimiento documentado del OEM. No alteramos parámetros de seguridad ni claves; cuando el emparejamiento exige una herramienta o autorización propietaria del fabricante, lo identificamos como requisito de cooperación.',
    zh: '除版本刷写外，在主机厂程序允许的情况下，我们还负责将控制单元与车辆进行匹配。再制造完成后，我们加载与原始配置相对应的版本；若该型号需要进行变体编码（variant coding）或与VIN/防盗系统同步，我们将按照主机厂记录在案的程序执行。我们不会更改任何安全参数或密钥；当匹配过程需要主机厂专有工具或授权时，我们会将其列为合作所需的前提条件。',
    en: 'Beyond version flashing, where the OEM procedure allows we also handle pairing the unit to the vehicle. After reconditioning we load the version matching the original configuration and, if the reference requires variant coding or VIN/immobilizer synchronization, we run it following the manufacturer\'s documented procedure. We do not alter safety parameters or keys; when pairing requires an OEM-proprietary tool or authorization, we flag it as a cooperation requirement.',
    interno: 'Confirmar qué casos de variant coding / sincronización VIN puede ejecutar Lizarte hoy de forma autónoma y cuáles exigen herramienta del OEM.'
  },
  {
    id: 'PA-02',
    titulo: 'ECUs cifradas, re-flash de firmware propio, OTA y ciberseguridad',
    escenario: 'Remanufactura (sensible)',
    es: 'Trabajamos siempre dentro del marco de autorización del fabricante. Sobre unidades con arranque seguro o firmware firmado no introducimos modificaciones que rompan la firma; reproducimos únicamente las versiones validadas que el fabricante autorice. Reconocemos que las actualizaciones OTA posteriores (marco UNECE R156) pueden requerir una revalidación de la versión cargada, y proponemos definir conjuntamente un protocolo de trazabilidad de versiones. Nuestra capacidad de análisis de protocolos se aplica exclusivamente a piezas fuera de garantía y con permiso del fabricante: en una cooperación con FinDreams trabajaríamos con vuestras versiones y vuestras llaves bajo acuerdo, nunca por ingeniería inversa de vuestros sistemas. El proceso es compatible con los marcos de ciberseguridad ISO/SAE 21434 y R155.',
    zh: '我们始终在主机厂授权框架内开展工作。对于具有安全启动或已签名固件的单元，我们不会进行任何破坏签名的修改，仅复刻主机厂授权的、经过验证的版本。我们了解后续的OTA升级（UNECE R156框架）可能需要对已加载版本重新验证，并建议共同制定版本可追溯性协议。我们的协议分析能力仅适用于超出质保期且经主机厂许可的零件：在与弗迪科技的合作中，我们将依据协议使用贵方的版本与密钥，绝不对贵方系统进行逆向工程。该流程符合 ISO/SAE 21434 与 R155 网络安全框架。',
    en: 'We always work within the manufacturer\'s authorization framework. On units with secure boot or signed firmware we make no modification that breaks the signature; we reproduce only the validated versions the manufacturer authorizes. We recognize that later OTA updates (UNECE R156 framework) may require revalidation of the loaded version, and we propose jointly defining a version-traceability protocol. Our protocol-analysis capability is applied exclusively to out-of-warranty parts with the manufacturer\'s permission: in a FinDreams cooperation we would work with your versions and your keys under agreement, never by reverse-engineering your systems. The process is compatible with the ISO/SAE 21434 and R155 cybersecurity frameworks.',
    interno: 'Pregunta de doble filo. Casi seguro que sale a partir de nuestra baza de \'crackeo de protocolos\' (MOM-02). Tener este encuadre memorizado: capacidad = sí; aplicada a sus ECUs = solo bajo acuerdo y con sus llaves.'
  },
  {
    id: 'PA-03',
    titulo: 'Recalibración de sensores de par y de ángulo tras la reman',
    escenario: 'Ambos',
    es: 'Tras la remanufactura recalibramos y verificamos el sensor de par y el de ángulo de dirección en nuestro banco: puesta a cero del par, centrado del ángulo de volante y comprobación de linealidad y repetibilidad frente a la referencia original. Documentamos los valores de calibración por número de serie para garantizar la trazabilidad.',
    zh: '再制造后，我们在检测台上对扭矩传感器和转向角传感器进行重新标定与验证：扭矩归零、方向盘转角中位标定，以及相对原厂基准的线性度与重复性检查。我们按序列号记录标定值，以确保可追溯性。',
    en: 'After reman we recalibrate and verify the torque and steering-angle sensors on our bench: torque zeroing, steering-wheel angle centering, and linearity and repeatability checks against the original reference. We record calibration values by serial number to ensure traceability.',
    interno: 'Confirmar el equipo de calibración concreto y la tolerancia de sensor que podemos citar como dato.'
  },
  {
    id: 'PA-04',
    titulo: 'Verificación del motor y de la electrónica de potencia',
    escenario: 'Remanufactura',
    es: 'Verificamos el motor (resistencia y aislamiento de bobinado, consumo de corriente y comportamiento bajo carga) y la etapa de potencia de la ECU en banco funcional. Aplicamos criterios de sustitución para los componentes sujetos a envejecimiento (rodamientos, condensadores) en función del estado medido, no por defecto.',
    zh: '我们在功能检测台上对电机（绕组电阻与绝缘、电流消耗及负载特性）和ECU功率级进行验证。对于易老化部件（轴承、电容），我们根据实测状态而非默认更换原则采用相应的更换标准。',
    en: 'We verify the motor (winding resistance and insulation, current draw and behavior under load) and the ECU power stage on a functional bench. We apply replacement criteria for ageing-sensitive components (bearings, capacitors) based on measured condition, not by default.',
    interno: 'Confirmar qué pruebas de aislamiento/potencia hace Lizarte y si se sustituyen condensadores/semiconductores o solo se testean.'
  },
  {
    id: 'PA-05',
    titulo: 'Criterio de sustituir frente a reutilizar (parte mecánica)',
    escenario: 'Remanufactura',
    es: 'Cada referencia cuenta con un plan de control con criterios de aceptación medibles para los elementos mecánicos clave (cremallera, husillo o recirculación de bolas, rodamientos, casquillos y retenes). Los componentes que superan el umbral de desgaste se sustituyen sistemáticamente por nuevos; el resto se valida dimensionalmente antes de reutilizarse. La holgura objetivo se fija por referencia: por ejemplo, en torno a 0,35 mm frente a los ~0,30 mm de una cremallera nueva tipo ZF.',
    zh: '每个型号都有控制计划，针对关键机械部件（齿条、滚珠丝杠或循环球、轴承、衬套与油封）设定可测量的合格判定标准。超过磨损阈值的部件一律更换为全新件；其余部件在重新使用前进行尺寸验证。目标间隙按型号设定：例如约0.35毫米，相较于ZF类型全新齿条约0.30毫米。',
    en: 'Each reference has a control plan with measurable acceptance criteria for the key mechanical elements (rack, ball screw or recirculating ball, bearings, bushings and seals). Components exceeding the wear threshold are systematically replaced with new ones; the rest are dimensionally validated before reuse. Target backlash is set per reference: for example, around 0.35 mm versus ~0.30 mm for a new ZF-type rack.',
    interno: ''
  },
  {
    id: 'PA-06',
    titulo: 'Seguridad funcional ISO 26262 / ASIL D y reparto de responsabilidad',
    escenario: 'Ambos · punto crítico',
    es: 'La dirección es un sistema ASIL D, y abordamos la reman preservando esa integridad. Disponemos de un proceso bajo IATF 16949 con plan de control y AMFE de proceso; los componentes y funciones relevantes para la seguridad se verifican al 100 % en el banco de fin de línea antes de la liberación. En el modelo de remanufactura, la responsabilidad del safety case del diseño original permanece en el fabricante, mientras que nosotros garantizamos que la unidad reacondicionada cumple los parámetros funcionales y de seguridad especificados. En un modelo OEM o de maquila, acordaríamos con vosotros el reparto de responsabilidades de seguridad funcional y la documentación asociada.',
    zh: '转向系统属于ASIL D等级，我们在再制造过程中注重保持这一完整性。我们拥有符合IATF 16949的流程，配备控制计划和过程FMEA；与安全相关的部件和功能在放行前于下线检测台进行100%验证。在再制造模式下，原始设计的安全论证（safety case）责任仍归主机厂所有，而我方负责确保再制造单元符合规定的功能与安全参数。在OEM或代工模式下，我们将与贵方约定功能安全责任的划分及相关文档。',
    en: 'Steering is an ASIL D system, and we approach reman so as to preserve that integrity. We operate an IATF 16949 process with a control plan and process FMEA; safety-relevant components and functions are 100% verified on the end-of-line bench before release. In the reman model, responsibility for the original design\'s safety case remains with the manufacturer, while we guarantee the reconditioned unit meets the specified functional and safety parameters. In an OEM or contract model we would agree the split of functional-safety responsibilities and associated documentation with you.',
    interno: 'Es probablemente donde más nos exijan. Confirmar si Lizarte tiene AMFE de proceso formal y cobertura de diagnóstico documentada. Si no existe en este formato, no afirmarlo: ofrecer desarrollarlo en la cooperación.'
  },
  {
    id: 'PA-07',
    titulo: 'Capacidad para steer-by-wire (SBW)',
    escenario: 'Remanufactura · frontera',
    es: 'Nuestra base instalada y experiencia actual está en EPS, CEPS, hidráulica y mecánica convencional, que es el grueso del parque que entrará en fin de garantía en los próximos 3-4 años, justo el mercado que vosotros mismos validasteis. El steer-by-wire, al eliminar el enlace mecánico e introducir redundancia y comportamiento fail-operational, plantea exigencias de validación distintas; lo vemos como una segunda fase natural de la cooperación, a desarrollar conjuntamente cuando el volumen de SBW en circulación lo justifique. Preferimos ser claros en este punto antes que comprometer una capacidad que aún no está madura.',
    zh: '我们目前的装机基础与经验集中在EPS、CEPS、液压及传统机械转向领域，这正是未来3-4年内将陆续到期脱保的主要存量市场，也正是贵方自己所验证的市场。线控转向（SBW）由于取消了机械连接并引入冗余与故障可运行（fail-operational）特性，其验证要求有所不同；我们将其视为合作的自然第二阶段，待路面上SBW保有量足以支撑时与贵方共同开发。在这一点上，我们宁愿坦诚相告，也不愿承诺尚不成熟的能力。',
    en: 'Our installed base and current experience are in EPS, CEPS, hydraulic and conventional mechanical steering, which is the bulk of the fleet reaching end-of-warranty in the next 3-4 years, exactly the market you yourselves validated. Steer-by-wire, by removing the mechanical link and introducing redundancy and fail-operational behavior, raises different validation demands; we see it as a natural second phase of the cooperation, to be developed jointly when the SBW volume on the road justifies it. We prefer to be clear on this rather than commit to a capability that is not yet mature.',
    interno: 'Decisión tuya: ¿comprometemos una hoja de ruta SBW explícita o lo dejamos abierto? La respuesta está redactada en modo honesto/roadmap, que es lo que recomiendo con ingenieros de BYD.'
  },
  {
    id: 'PA-08',
    titulo: 'Actuadores de dirección al eje trasero (RWS / 4WS)',
    escenario: 'Remanufactura · frontera',
    es: 'Al igual que con el steer-by-wire, los actuadores de dirección al eje trasero son una tecnología que evaluaríamos en una fase posterior. El proceso de reman de un actuador RWS —mecánica de precisión, sensórica de posición y su validación de redundancia— es abordable con nuestra metodología, pero requeriría una transferencia de especificaciones y criterios de aceptación por vuestra parte. Lo planteamos como candidato a un proyecto piloto conjunto.',
    zh: '与线控转向类似，后轮转向（RWS）执行器属于我们将在后续阶段评估的技术。RWS执行器的再制造工艺——精密机械、位置传感及其冗余验证——在我们的方法论框架内是可行的，但需要贵方提供规格与合格判定标准的转移。我们建议将其作为双方联合试点项目的候选对象。',
    en: 'As with steer-by-wire, rear-wheel-steering actuators are a technology we would evaluate in a later phase. Remanufacturing an RWS actuator — precision mechanics, position sensing and its redundancy validation — is addressable with our methodology, but would require a transfer of specifications and acceptance criteria from your side. We propose it as a candidate for a joint pilot project.',
    interno: ''
  },
  {
    id: 'PA-09',
    titulo: 'Ensayos de durabilidad y banco de fin de línea',
    escenario: 'Ambos',
    es: 'Cada unidad pasa por un banco de fin de línea que reproduce las condiciones funcionales de la dirección y discrimina por debajo del 5 % de desviación frente a la pieza original, admitiendo hasta un 10 % en modelos concretos. Lo complementamos con ensayos de rodaje de 3.000 a 5.000 km y disponemos de una base de datos de más de 6.000 referencias que respalda los parámetros de validación.',
    zh: '每台单元都需通过下线检测台，该检测台复现转向的功能工况，合格判定为相对原厂零件偏差不超过5%，特定型号允许最高10%。我们辅以3,000至5,000公里的磨合试验，并拥有逾6,000个型号的数据库为验证参数提供支撑。',
    en: 'Each unit goes through an end-of-line bench that reproduces the steering\'s functional conditions and discriminates below 5% deviation from the original part, allowing up to 10% on specific models. We complement this with 3,000-5,000 km run-in testing and maintain a database of over 6,000 references that underpins the validation parameters.',
    interno: 'Si piden detalle de endurance, confirmar perfil y número de ciclos de ensayo de durabilidad que podemos declarar.'
  },
  {
    id: 'PA-10',
    titulo: 'PPAP / APQP / capacidad de proceso (Cpk) / PPM',
    escenario: 'Maquila',
    es: 'Como proveedor certificado IATF 16949 trabajamos con la metodología APQP y entregamos documentación PPAP en el nivel acordado para los nuevos montajes. Reportamos capacidad de proceso (Cpk) sobre las características críticas y gestionamos la calidad por PPM, con sistema de acción correctiva 8D.',
    zh: '作为通过IATF 16949认证的供应商，我们采用APQP方法，并按约定级别为新装配件提供PPAP文档。我们就关键特性报告过程能力（Cpk），并以PPM管理质量，配套8D纠正措施体系。',
    en: 'As an IATF 16949-certified supplier we work with the APQP methodology and deliver PPAP documentation at the agreed level for new assemblies. We report process capability (Cpk) on critical characteristics and manage quality by PPM, with an 8D corrective-action system.',
    interno: 'Confirmar el nivel de PPAP y los valores de Cpk/PPM que podemos comprometer ante un OEM.'
  },
  {
    id: 'PA-11',
    titulo: 'Gestión del core, limpieza y trazabilidad',
    escenario: 'Remanufactura',
    es: 'Operamos una gestión de core con identificación a la entrada, un proceso de limpieza definido por tipo de pieza y trazabilidad por número de serie a lo largo de todo el proceso, vinculando cada unidad a sus operaciones, recambios y resultados de banco. El alcance de nuestro certificado IATF 16949 cubre estas operaciones.',
    zh: '我们实行旧件（core）管理：入厂即标识，按零件类型设定清洗工艺，并在整个流程中按序列号实现可追溯，将每台单元与其工序、更换件及检测台结果相关联。我们的IATF 16949证书涵盖上述作业范围。',
    en: 'We run core management with identification on intake, a cleaning process defined by part type, and serial-number traceability throughout, linking each unit to its operations, replaced parts and bench results. The scope of our IATF 16949 certificate covers these operations.',
    interno: 'Confirmar el alcance exacto del certificado y si la trazabilidad es por lote o por número de serie individual.'
  },
  {
    id: 'PA-12',
    titulo: 'Homologación R79, R155/R156 y Conformity of Production',
    escenario: 'Maquila',
    es: 'Para el suministro OEM en Europa, la dirección se homologa bajo el Reglamento UNECE R79; los aspectos de ciberseguridad y actualización de software se rigen por los Reglamentos R155 y R156. En un modelo de maquila, la homologación de tipo del componente y la responsabilidad del Conformity of Production se definirían en el acuerdo: lo habitual es que la homologación de diseño la mantenga el fabricante (vosotros) y que nosotros aseguremos la conformidad de producción de las unidades ensambladas. Podemos dar soporte documental y de proceso a la auditoría de CoP.',
    zh: '面向欧洲的OEM供货，转向系统须依据UNECE R79法规进行型式认证；网络安全与软件升级方面则适用R155与R156法规。在代工模式下，部件的型式认证与生产一致性（CoP）责任将在协议中界定：通常设计认证由主机厂（贵方）持有，我方负责确保所装配单元的生产一致性。我们可为CoP审核提供文档与流程支持。',
    en: 'For OEM supply in Europe, steering is type-approved under UNECE Regulation R79; cybersecurity and software-update aspects fall under Regulations R155 and R156. In a contract-manufacturing model, the component\'s type approval and the Conformity-of-Production responsibility would be defined in the agreement: typically the design approval is held by the manufacturer (you) and we ensure production conformity of the assembled units. We can provide documentary and process support for the CoP audit.',
    interno: 'Confirmar hasta dónde puede Lizarte sostener responsabilidad de homologación/CoP antes de comprometerlo.'
  },
  {
    id: 'PA-13',
    titulo: 'Capacidad de línea, ramp-up, plazos y localización de subproveedores',
    escenario: 'Maquila',
    es: 'Disponemos de instalaciones de ensamblaje y verificación en Pamplona con capacidad para integrar nuevas líneas de montaje con par controlado, poka-yoke y test de fin de línea. Para un proyecto de maquila definiríamos conjuntamente los volúmenes, la curva de ramp-up y el lead time, y trabajaríamos la localización de subproveedores europeos allí donde aporte ventaja logística o arancelaria.',
    zh: '我们在潘普洛纳拥有装配与检测设施，具备整合新装配线的能力，配备扭矩控制、防错（poka-yoke）及下线检测。对于代工项目，我们将与贵方共同确定产量、产能爬坡曲线与交付周期，并在具备物流或关税优势之处推进欧洲本地供应商的属地化。',
    en: 'We have assembly and verification facilities in Pamplona with the capacity to integrate new assembly lines with torque-controlled fastening, poka-yoke and end-of-line testing. For a contract-manufacturing project we would jointly define volumes, the ramp-up curve and lead time, and work on localizing European sub-suppliers where it adds logistical or tariff advantage.',
    interno: 'Confirmar capacidad, volúmenes y plazos concretos antes de cifrarlos ante FinDreams.'
  },
  {
    id: 'PA-14',
    titulo: 'Protección de la propiedad intelectual del fabricante',
    escenario: 'Maquila',
    es: 'Entendemos que vuestra propiedad intelectual es un activo crítico. En un acuerdo de maquila trabajaríamos bajo acuerdo de confidencialidad (NDA), con segregación de la información técnica, control de acceso a planos y especificaciones y trazabilidad de quién accede a qué. Vuestros diseños, software y llaves permanecen vuestros; nosotros solo ejecutamos el proceso acordado. Podemos formalizar las medidas concretas de protección de IP que requiráis.',
    zh: '我们理解贵方的知识产权是关键资产。在代工协议下，我们将在保密协议（NDA）框架内运作，对技术信息实行隔离管理，对图纸与规格实行访问控制，并对访问行为进行可追溯记录。贵方的设计、软件与密钥归贵方所有；我方仅执行约定的工艺流程。我们可就贵方所需的具体知识产权保护措施予以正式约定。',
    en: 'We understand your intellectual property is a critical asset. Under a contract-manufacturing agreement we would operate under a non-disclosure agreement (NDA), with segregation of technical information, access control over drawings and specifications, and traceability of who accesses what. Your designs, software and keys remain yours; we only execute the agreed process. We can formalize the specific IP-protection measures you require.',
    interno: ''
  },
  {
    id: 'PA-15',
    titulo: 'Integración con ADAS y recalibración asociada',
    escenario: 'Remanufactura',
    es: 'La dirección actual es un actuador para funciones de asistencia (mantenimiento de carril, aparcamiento) sujetas al Reglamento R79. Tras la reman aseguramos que los parámetros de la dirección relevantes para esas funciones (par, ángulo y respuesta) quedan dentro de especificación; la calibración de los sensores del propio sistema ADAS del vehículo corresponde al procedimiento de servicio del OEM. Coordinaríamos con vosotros qué calibraciones quedan de nuestro lado y cuáles del taller o del vehículo.',
    zh: '当前的转向系统是辅助驾驶功能（车道保持、泊车）的执行器，受R79法规约束。再制造后，我们确保与这些功能相关的转向参数（扭矩、转角与响应）处于规格范围内；车辆ADAS系统自身传感器的标定则属于主机厂的服务程序。我们将与贵方协调哪些标定由我方负责、哪些由车间或整车负责。',
    en: 'Current steering is an actuator for assistance functions (lane-keeping, parking) governed by Regulation R79. After reman we ensure the steering parameters relevant to those functions (torque, angle and response) are within specification; calibration of the vehicle\'s own ADAS sensors belongs to the OEM service procedure. We would coordinate with you which calibrations sit on our side and which on the workshop or vehicle.',
    interno: 'Confirmar qué recalibraciones relacionadas con ADAS están realmente en el alcance de Lizarte.'
  },
  {
    id: 'PA-16',
    titulo: 'Declaración de materiales IMDS, REACH y RoHS',
    escenario: 'Maquila / Remanufactura',
    es: 'Para el suministro OEM gestionamos la declaración de materiales en IMDS y aseguramos el cumplimiento de REACH y, donde aplique, RoHS, tanto para los componentes nuevos que incorporamos como para los consumibles del proceso.',
    zh: '面向OEM供货，我们在IMDS中管理材料申报，并确保符合REACH及（适用时）RoHS要求，涵盖我方加装的新部件及工艺消耗品。',
    en: 'For OEM supply we manage material declaration in IMDS and ensure compliance with REACH and, where applicable, RoHS, both for the new components we incorporate and for process consumables.',
    interno: 'Confirmar que Lizarte reporta en IMDS hoy; si no, no afirmarlo.'
  }
];
