import {
  Layers,
  Paintbrush,
  BrickWall,
  Building2,
  Droplets,
  SprayCan,
  Wrench,
  ThermometerSun,
  PiggyBank,
  Home,
  Leaf,
} from "lucide-react";

export const services = [
  {
    icon: Layers,
    iconColor: "text-orange-500",
    title: 'Sistema ETICS ("Capoto")',
    description:
      "Aplicação profissional de isolamento térmico pelo exterior. Reduz perdas de calor, elimina pontes térmicas e melhora o conforto do seu edifício durante todo o ano.",
    features: [
      "Poupança até 40% em energia",
      "Eliminação de pontes térmicas",
      "Acabamentos personalizados",
      "Valorização do imóvel",
    ],
  },
  {
    icon: Paintbrush,
    iconColor: "text-rose-500",
    title: "Pintura Exterior",
    description:
      "Renovação de fachadas com tintas de alta qualidade e durabilidade. Protegemos e embelezamos o exterior do seu edifício.",
    features: [
      "Tintas de alta resistência",
      "Preparação completa de superfícies",
      "Proteção contra intempéries",
      "Variedade de cores e texturas",
    ],
  },
  {
    icon: BrickWall,
    iconColor: "text-amber-600",
    title: "Barramento",
    description:
      "Regularização e preparação de superfícies exteriores. Criamos a base perfeita para acabamentos de qualidade superior.",
    features: [
      "Correção de imperfeições",
      "Preparação para pintura",
      "Acabamento liso ou texturado",
      "Materiais certificados",
    ],
  },
  {
    icon: Building2,
    iconColor: "text-slate-600",
    title: "Recuperação de Fachadas",
    description:
      "Restauro e renovação completa de fachadas degradadas. Devolvemos a vida e a beleza ao exterior do seu edifício.",
    features: [
      "Diagnóstico técnico completo",
      "Reparação de fissuras e danos",
      "Tratamento de patologias",
      "Renovação estética total",
    ],
  },
  {
    icon: Droplets,
    iconColor: "text-sky-500",
    title: "Impermeabilização",
    description:
      "Proteção contra infiltrações e humidade. Garantimos a durabilidade das superfícies exteriores com soluções técnicas adequadas.",
    features: [
      "Proteção contra água",
      "Prevenção de danos estruturais",
      "Produtos de alta qualidade",
      "Soluções duradouras",
    ],
  },
  {
    icon: SprayCan,
    iconColor: "text-teal-500",
    title: "Limpeza de Telhados",
    description:
      "Removemos eficazmente detritos, musgo e líquenes do seu telhado. A limpeza regular previne danos, melhora a estética e prolonga a vida útil da cobertura.",
    features: [
      "Remoção de musgo e detritos",
      "Prevenção de entupimentos",
      "Melhoria da aparência do telhado",
      "Tratamentos preventivos",
    ],
  },
  {
    icon: Wrench,
    iconColor: "text-zinc-500",
    title: "Manutenção de Exteriores",
    description:
      "Serviços de manutenção preventiva e corretiva para fachadas e superfícies exteriores, prolongando a vida útil do seu investimento.",
    features: [
      "Inspeções periódicas",
      "Reparações pontuais",
      "Limpeza de fachadas",
      "Planos de manutenção",
    ],
  },
];

export const eticsBenefits = [
  {
    icon: ThermometerSun,
    iconColor: "text-orange-500",
    title: "Conforto Térmico",
    description: "Temperatura interior estável durante todo o ano.",
  },
  {
    icon: PiggyBank,
    iconColor: "text-emerald-500",
    title: "Poupança Energética",
    description: "Reduza até 40% nos custos de climatização.",
  },
  {
    icon: Home,
    iconColor: "text-amber-500",
    title: "Valorização",
    description: "Aumento do valor de mercado do seu imóvel.",
  },
  {
    icon: Leaf,
    iconColor: "text-green-600",
    title: "Sustentabilidade",
    description: "Menor pegada ecológica e emissões de CO₂.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Contacto",
    description: "Entre em contacto connosco para discutir o seu projeto.",
  },
  {
    step: "02",
    title: "Avaliação",
    description: "Visitamos o local e avaliamos as necessidades específicas.",
  },
  {
    step: "03",
    title: "Orçamento",
    description: "Apresentamos uma proposta detalhada e transparente.",
  },
  {
    step: "04",
    title: "Execução",
    description: "Realizamos o trabalho com qualidade e profissionalismo.",
  },
];
