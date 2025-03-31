import React, { useState } from 'react';
import { 
  Search, ChevronRight, Check, X, DollarSign, Clock, AlertCircle, Download, Menu, 
  Bell, HelpCircle, User, ArrowLeft, ArrowRight, FileText, Edit, Archive, ChevronDown, 
  Send, MessageSquare, Calendar, Filter, MoreHorizontal, Trash2, PenTool, Sparkles, Plus, Info,
  Eye
} from 'lucide-react';

const CDPManagementSystem = () => {
  // Estados principales
  const [selectedCDP, setSelectedCDP] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [activeFilter, setActiveFilter] = useState('pendingApproval');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [messageText, setMessageText] = useState('');
  const [selectedRubros, setSelectedRubros] = useState([]);

  // Datos de ejemplo
  const cdpRequests = [
    { 
      id: 1, 
      number: "CDP-2025-0210",
      description: 'Servicios profesionales desarrollo módulo SICOF', 
      creationDate: '22/03/2025 - 08:30', 
      value: "$66,555,444",
      lastUpdate: { date: '22/03/2025 - 10:15', type: 'new' },
      requestor: 'María González',
      department: 'Sistemas',
      status: 'pending',
      hasMessages: true,
      rubros: [
        { 
          id: 1, 
          code: '2.1.2.01', 
          name: 'SERVICIOS TÉCNICOS', 
          amount: 45000000,
          formattedAmount: "$45,000,000",
          available: 72000000,
          formattedAvailable: "$72,000,000",
          impact: 62.5
        },
        { 
          id: 2, 
          code: '2.1.2.03', 
          name: 'HONORARIOS PROFESIONALES', 
          amount: 21555444,
          formattedAmount: "$21,555,444",
          available: 68000000,
          formattedAvailable: "$68,000,000",
          impact: 31.7
        }
      ],
      documents: [
        { id: 1, name: 'Memorando_MT-2025-087.pdf', type: 'Documento principal', size: '380 KB', date: '22/03/2025' },
        { id: 2, name: 'Cotizaciones.pdf', type: 'Documento soporte', size: '1.2 MB', date: '22/03/2025' }
      ],
      messages: [
        {
          id: 1,
          date: '22/03/2025 - 08:30',
          user: 'María González',
          userInitials: 'MG',
          role: 'Elaborador',
          content: 'Se solicita disponibilidad para servicios profesionales según memorando MT-2025-087.',
          attachments: []
        },
        {
          id: 2,
          date: '22/03/2025 - 14:45',
          user: 'Juan Pérez',
          userInitials: 'JP',
          role: 'Analista Presupuestal',
          content: '¿Podría aclarar si estos servicios corresponden al proyecto de transformación digital incluido en el Plan Anual de Adquisiciones?',
          attachments: []
        },
        {
          id: 3,
          date: '22/03/2025 - 15:20',
          user: 'María González',
          userInitials: 'MG',
          role: 'Elaborador',
          content: 'Sí, corresponde al proyecto de transformación digital, específicamente al componente de desarrollo del módulo SICOF según lo establecido en el PAA 2025, ítem 24.',
          attachments: ['PAA_2025_Sistemas.pdf']
        }
      ],
      history: [
        { date: '22/03/2025 - 08:30', user: 'María González', role: 'Elaborador', action: 'Creación', status: 'Borrador', comment: 'Creación inicial del documento' },
        { date: '22/03/2025 - 09:45', user: 'María González', role: 'Elaborador', action: 'Modificación', status: 'Borrador', comment: 'Ajuste en valores de rubros según cotizaciones' },
        { date: '22/03/2025 - 10:15', user: 'María González', role: 'Elaborador', action: 'Envío', status: 'Pendiente', comment: 'Solicitud completada y enviada para aprobación' }
      ]
    },
    { 
      id: 2, 
      number: "CDP-2025-0211",
      description: 'Materiales y suministros oficina central', 
      creationDate: '22/03/2025 - 09:45', 
      value: "$26,450,000",
      lastUpdate: { date: '22/03/2025 - 14:30', type: 'message' },
      requestor: 'Carlos Ramírez',
      department: 'Administrativa',
      status: 'pending',
      hasMessages: true,
      rubros: [
        { 
          id: 3, 
          code: '2.1.1.01', 
          name: 'MATERIALES DE OFICINA', 
          amount: 12500000,
          formattedAmount: "$12,500,000",
          available: 45000000,
          formattedAvailable: "$45,000,000",
          impact: 27.8
        },
        { 
          id: 4, 
          code: '2.1.1.02', 
          name: 'EQUIPOS MENORES', 
          amount: 8350000,
          formattedAmount: "$8,350,000",
          available: 15000000,
          formattedAvailable: "$15,000,000",
          impact: 55.7
        },
        { 
          id: 5, 
          code: '2.1.1.05', 
          name: 'PAPELERÍA', 
          amount: 5600000,
          formattedAmount: "$5,600,000",
          available: 8000000,
          formattedAvailable: "$8,000,000",
          impact: 70.0
        }
      ],
      documents: [
        { id: 3, name: 'Solicitud_Materiales.pdf', type: 'Documento principal', size: '420 KB', date: '22/03/2025' },
        { id: 4, name: 'Inventario_Actual.xlsx', type: 'Documento soporte', size: '1.8 MB', date: '21/03/2025' },
        { id: 5, name: 'Cotizaciones_Comparativas.pdf', type: 'Documento soporte', size: '2.4 MB', date: '21/03/2025' }
      ],
      messages: [
        {
          id: 4,
          date: '22/03/2025 - 09:50',
          user: 'Carlos Ramírez',
          userInitials: 'CR',
          role: 'Elaborador',
          content: 'Se solicita disponibilidad para la adquisición de materiales y suministros para la oficina central durante el segundo trimestre.',
          attachments: []
        },
        {
          id: 5,
          date: '22/03/2025 - 11:30',
          user: 'Patricia López',
          userInitials: 'PL',
          role: 'Coordinadora Administrativa',
          content: 'Apruebo esta solicitud a nivel departamental. Favor proceder con la gestión presupuestal correspondiente.',
          attachments: ['Aprobacion_Administrativa.pdf']
        },
        {
          id: 6,
          date: '22/03/2025 - 14:30',
          user: 'Juan Pérez',
          userInitials: 'JP',
          role: 'Analista Presupuestal',
          content: 'Noto que el rubro de PAPELERÍA tiene un impacto presupuestal del 70%. ¿Es posible priorizar elementos o reducir cantidades para disminuir el impacto?',
          attachments: []
        }
      ],
      history: [
        { date: '21/03/2025 - 16:45', user: 'Carlos Ramírez', role: 'Elaborador', action: 'Creación', status: 'Borrador', comment: 'Borrador inicial con estimaciones preliminares' },
        { date: '22/03/2025 - 09:15', user: 'Carlos Ramírez', role: 'Elaborador', action: 'Modificación', status: 'Borrador', comment: 'Valores ajustados según cotizaciones finales' },
        { date: '22/03/2025 - 09:45', user: 'Carlos Ramírez', role: 'Elaborador', action: 'Envío', status: 'Pendiente', comment: 'Documento enviado a coordinación administrativa' },
        { date: '22/03/2025 - 11:30', user: 'Patricia López', role: 'Coordinadora Administrativa', action: 'Aprobación departamental', status: 'Pendiente', comment: 'Aprobado a nivel de departamento, continúa a presupuesto' }
      ]
    },
    { 
      id: 3, 
      number: "CDP-2025-0212",
      description: 'Mantenimiento aires acondicionados Sede Norte', 
      creationDate: '23/03/2025 - 08:15', 
      value: "$8,750,000",
      lastUpdate: { date: '23/03/2025 - 08:15', type: 'new' },
      requestor: 'Laura Mendoza',
      department: 'Mantenimiento',
      status: 'pending',
      hasMessages: false,
      rubros: [
        { 
          id: 6, 
          code: '2.1.3.02', 
          name: 'MANTENIMIENTO EDIFICACIONES', 
          amount: 8750000,
          formattedAmount: "$8,750,000",
          available: 35000000,
          formattedAvailable: "$35,000,000",
          impact: 25.0
        }
      ],
      documents: [
        { id: 6, name: 'Solicitud_Mantenimiento.pdf', type: 'Documento principal', size: '290 KB', date: '23/03/2025' },
        { id: 7, name: 'Cronograma_Mantenimiento_2025.xlsx', type: 'Documento soporte', size: '950 KB', date: '22/03/2025' }
      ],
      messages: [
        {
          id: 7,
          date: '23/03/2025 - 08:15',
          user: 'Laura Mendoza',
          userInitials: 'LM',
          role: 'Elaborador',
          content: 'Se solicita disponibilidad para el mantenimiento preventivo y correctivo de los sistemas de aire acondicionado de la Sede Norte, según cronograma anual aprobado.',
          attachments: []
        }
      ],
      history: [
        { date: '23/03/2025 - 08:15', user: 'Laura Mendoza', role: 'Elaborador', action: 'Creación y envío', status: 'Pendiente', comment: 'Solicitud directa según plan anual de mantenimiento' }
      ]
    },
    { 
      id: 4, 
      number: "CDP-2025-0213",
      description: 'Servicios de capacitación personal nuevo', 
      creationDate: '23/03/2025 - 10:45', 
      value: "$14,250,000",
      lastUpdate: { date: '24/03/2025 - 09:10', type: 'approved' },
      requestor: 'Andrea Torres',
      department: 'Recursos Humanos',
      status: 'approved',
      hasMessages: false,
      rubros: [
        { 
          id: 7, 
          code: '2.1.4.01', 
          name: 'CAPACITACIÓN', 
          amount: 14250000,
          formattedAmount: "$14,250,000",
          available: 50000000,
          formattedAvailable: "$50,000,000",
          impact: 28.5
        }
      ],
      documents: [
        { id: 8, name: 'Plan_Capacitación_2025.pdf', type: 'Documento principal', size: '1.1 MB', date: '23/03/2025' },
        { id: 9, name: 'Cotizaciones_Proveedores.pdf', type: 'Documento soporte', size: '2.3 MB', date: '22/03/2025' },
        { id: 10, name: 'Listado_Personal_Nuevo.xlsx', type: 'Documento soporte', size: '320 KB', date: '23/03/2025' }
      ],
      messages: [
        {
          id: 8,
          date: '23/03/2025 - 10:45',
          user: 'Andrea Torres',
          userInitials: 'AT',
          role: 'Elaborador',
          content: 'Se solicita disponibilidad para programa de inducción y capacitación del personal contratado durante el primer trimestre.',
          attachments: []
        },
        {
          id: 9,
          date: '23/03/2025 - 15:20',
          user: 'Juan Pérez',
          userInitials: 'JP',
          role: 'Analista Presupuestal',
          content: 'Solicitud revisada y validada según Plan Anual de Capacitación aprobado para 2025. Procedo con aprobación.',
          attachments: []
        }
      ],
      history: [
        { date: '23/03/2025 - 10:45', user: 'Andrea Torres', role: 'Elaborador', action: 'Creación y envío', status: 'Pendiente', comment: 'Solicitud según Plan de Capacitación 2025' },
        { date: '23/03/2025 - 15:20', user: 'Juan Pérez', role: 'Analista Presupuestal', action: 'Revisión', status: 'En revisión', comment: 'Revisión de documentación y montos' },
        { date: '24/03/2025 - 09:10', user: 'Carolina Herrera', role: 'Coordinadora Presupuesto', action: 'Aprobación', status: 'Aprobado', comment: 'Aprobado según disponibilidad presupuestal y prioridades institucionales' }
      ]
    },
    { 
      id: 5, 
      number: "CDP-2025-0214",
      description: 'Eventos corporativos Q2', 
      creationDate: '24/03/2025 - 08:30', 
      value: "$22,500,000",
      lastUpdate: { date: '25/03/2025 - 11:20', type: 'rejected' },
      requestor: 'Jorge Ramírez',
      department: 'Comunicaciones',
      status: 'rejected',
      hasMessages: true,
      rubros: [
        { 
          id: 8, 
          code: '2.1.5.03', 
          name: 'EVENTOS INSTITUCIONALES', 
          amount: 22500000,
          formattedAmount: "$22,500,000",
          available: 25000000,
          formattedAvailable: "$25,000,000",
          impact: 90.0
        }
      ],
      documents: [
        { id: 11, name: 'Solicitud_Eventos_Q2.pdf', type: 'Documento principal', size: '780 KB', date: '24/03/2025' },
        { id: 12, name: 'Plan_Eventos_2025.pdf', type: 'Documento soporte', size: '1.3 MB', date: '15/01/2025' },
        { id: 13, name: 'Cotizaciones_Eventos.pdf', type: 'Documento soporte', size: '4.2 MB', date: '23/03/2025' }
      ],
      messages: [
        {
          id: 10,
          date: '24/03/2025 - 08:30',
          user: 'Jorge Ramírez',
          userInitials: 'JR',
          role: 'Elaborador',
          content: 'Se solicita disponibilidad para eventos corporativos programados para el segundo trimestre según Plan Anual de Eventos.',
          attachments: []
        },
        {
          id: 11,
          date: '24/03/2025 - 16:45',
          user: 'Juan Pérez',
          userInitials: 'JP',
          role: 'Analista Presupuestal',
          content: 'El impacto presupuestal de esta solicitud es del 90% del rubro, lo cual compromete casi la totalidad del presupuesto disponible para eventos. ¿Es posible ajustar esta solicitud considerando las necesidades anuales?',
          attachments: []
        },
        {
          id: 12,
          date: '25/03/2025 - 09:30',
          user: 'Jorge Ramírez',
          userInitials: 'JR',
          role: 'Elaborador',
          content: 'Entiendo la preocupación. Sin embargo, estos eventos ya fueron aprobados por Dirección General. ¿Podríamos considerar un traslado presupuestal en caso de ser necesario para eventos futuros?',
          attachments: ['Aprobacion_Direccion.pdf']
        },
        {
          id: 13,
          date: '25/03/2025 - 11:20',
          user: 'Carolina Herrera',
          userInitials: 'CH',
          role: 'Coordinadora Presupuesto',
          content: 'Solicitud rechazada. Se debe revisar la programación de eventos y distribuir el presupuesto para cubrir las necesidades anuales. Por favor reajustar la solicitud a un máximo del 50% del rubro disponible.',
          attachments: []
        }
      ],
      history: [
        { date: '24/03/2025 - 08:30', user: 'Jorge Ramírez', role: 'Elaborador', action: 'Creación y envío', status: 'Pendiente', comment: 'Solicitud según Plan de Eventos 2025' },
        { date: '24/03/2025 - 16:45', user: 'Juan Pérez', role: 'Analista Presupuestal', action: 'Revisión', status: 'En revisión', comment: 'Análisis de impacto presupuestal' },
        { date: '25/03/2025 - 11:20', user: 'Carolina Herrera', role: 'Coordinadora Presupuesto', action: 'Rechazo', status: 'Rechazado', comment: 'Impacto presupuestal excesivo, se solicita reajuste' }
      ]
    }
  ];

  // Filtrar CDPs según filtro activo
  const filteredCDPs = cdpRequests.filter(cdp => {
    if (activeFilter === 'pendingApproval') return cdp.status === 'pending';
    if (activeFilter === 'approved') return cdp.status === 'approved';
    if (activeFilter === 'rejected') return cdp.status === 'rejected';
    if (activeFilter === 'modified') return cdp.status === 'modified';
    if (activeFilter === 'cancelled') return cdp.status === 'cancelled';
    if (activeFilter === 'myDepartment') return cdp.department === 'Sistemas';
    return true; // 'all'
  });

  // Obtener recuento por estado
  const getCountByStatus = (status) => {
    return cdpRequests.filter(cdp => cdp.status === status).length;
  };

  // Verificar si todos los elementos están seleccionados
  const allSelected = filteredCDPs.length > 0 && selectedItems.length === filteredCDPs.length;

  // Seleccionar/deseleccionar todos los elementos
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
      setShowBulkActions(false);
    } else {
      setSelectedItems(filteredCDPs.map(cdp => cdp.id));
      setShowBulkActions(true);
    }
  };

  // Seleccionar/deseleccionar un elemento
  const toggleSelect = (id) => {
    if (selectedItems.includes(id)) {
      const newSelection = selectedItems.filter(item => item !== id);
      setSelectedItems(newSelection);
      setShowBulkActions(newSelection.length > 0);
    } else {
      const newSelection = [...selectedItems, id];
      setSelectedItems(newSelection);
      setShowBulkActions(true);
    }
  };

  // Verificar si un elemento está seleccionado
  const isSelected = (id) => {
    return selectedItems.includes(id);
  };

  // Seleccionar un CDP y mostrar panel de detalles
  const handleSelectCDP = (cdp) => {
    setSelectedCDP(cdp);
    setSelectedRubros([]);
    setShowDetailPanel(true);
    setActiveTab('general');
  };

  // Mostrar modal de confirmación para una acción
  const showActionModal = (action) => {
    setModalAction(action);
    setShowConfirmModal(true);
  };

  // Cerrar panel de detalles
  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedCDP(null);
  };

  // Navegar a CDP anterior
  const goToPreviousCDP = () => {
    if (!selectedCDP) return;
    const currentIndex = filteredCDPs.findIndex(cdp => cdp.id === selectedCDP.id);
    if (currentIndex > 0) {
      setSelectedCDP(filteredCDPs[currentIndex - 1]);
    }
  };

  // Navegar a CDP siguiente
  const goToNextCDP = () => {
    if (!selectedCDP) return;
    const currentIndex = filteredCDPs.findIndex(cdp => cdp.id === selectedCDP.id);
    if (currentIndex < filteredCDPs.length - 1) {
      setSelectedCDP(filteredCDPs[currentIndex + 1]);
    }
  };

  // AI para sugerir texto
  const suggestText = () => {
    // Simulación de sugerencia de IA
    if (activeTab === 'messages') {
      setAiSuggestion("He revisado la solicitud y considero que cumple con todos los requisitos necesarios para su aprobación. Los montos solicitados están dentro de los parámetros establecidos y la documentación está completa.");
    } else {
      setAiSuggestion("La solicitud se rechaza debido a que el monto solicitado excede el presupuesto disponible para el rubro especificado. Se recomienda ajustar los valores o dividir la solicitud en múltiples CDPs.");
    }
  };

  // Aplicar sugerencia de IA
  const applySuggestion = () => {
    setMessageText(aiSuggestion);
    setAiSuggestion('');
  };

  // Togglear selección de rubro
  const toggleRubroSelection = (rubroId) => {
    if (selectedRubros.includes(rubroId)) {
      setSelectedRubros(selectedRubros.filter(id => id !== rubroId));
    } else {
      setSelectedRubros([...selectedRubros, rubroId]);
    }
  };

  // Seleccionar o deseleccionar todos los rubros
  const toggleAllRubros = () => {
    if (selectedRubros.length === selectedCDP.rubros.length) {
      setSelectedRubros([]);
    } else {
      setSelectedRubros(selectedCDP.rubros.map(rubro => rubro.id));
    }
  };

  // Llevar a cero rubros seleccionados
  const zeroSelectedRubros = () => {
    showActionModal('zeroRubros');
  };

  // TopBar con información del usuario y sistema
  const TopBar = () => (
    <div className="bg-white border-b border-gray-200 h-14 flex items-center px-4 justify-between">
      <div className="flex items-center">
        <Menu className="h-5 w-5 text-gray-500 mr-4" />
        <div className="text-lg font-semibold text-gray-800">SICOF<span className="text-teal-600">ERP</span></div>
      </div>
      <div className="flex items-center space-x-3">
        <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <HelpCircle className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 bg-teal-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-teal-700">JP</span>
        </div>
      </div>
    </div>
  );

  // Breadcrumbs para navegación contextual
  const Breadcrumbs = () => (
    <div className="flex items-center text-sm mt-4 mx-6 mb-2">
      <a href="#" className="text-gray-500 hover:text-teal-600">SICOF</a>
      <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />
      <a href="#" className="text-gray-500 hover:text-teal-600">Presupuesto</a>
      <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />
      <span className="text-gray-800 font-medium">Gestión de CDPs</span>
    </div>
  );

  // Dashboard con estadísticas
  const Dashboard = () => (
    <div className="bg-white p-4 border-b border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Por aprobar</p>
              <p className="text-2xl font-bold text-gray-800">{getCountByStatus('pending')}</p>
            </div>
            <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">2 de hoy, 1 pendiente</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Procesadas hoy</p>
              <p className="text-2xl font-bold text-gray-800">4</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-4 w-4 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            <span className="text-green-600">1 aprobada</span>, 
            <span className="text-red-600"> 1 rechazada</span>, 
            <span className="text-amber-600"> 2 modificadas</span>
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Valor pendiente</p>
              <p className="text-lg font-bold text-gray-800">$101.76M</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '35%' }}></div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Rubros críticos</p>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 truncate">Servicios técnicos</span>
              <span className="text-red-600 font-medium">82%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 truncate">Eventos y comunicaciones</span>
              <span className="text-red-600 font-medium">85%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 truncate">Equipos menores</span>
              <span className="text-amber-600 font-medium">55%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Barra de filtros
  const FilterBar = () => (
    <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <span className="text-sm text-gray-500 flex-shrink-0">Filtros:</span>
        <button 
          className={`px-3 py-1 ${activeFilter === 'pendingApproval' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'} rounded-full text-sm`}
          onClick={() => setActiveFilter('pendingApproval')}
        >
          Por aprobar 
          <span className="ml-1 text-xs">{getCountByStatus('pending')}</span>
        </button>
        <button 
          className={`px-3 py-1 ${activeFilter === 'approved' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'} rounded-full text-sm`}
          onClick={() => setActiveFilter('approved')}
        >
          Aprobados 
          <span className="ml-1 text-xs">{getCountByStatus('approved')}</span>
        </button>
        <button 
          className={`px-3 py-1 ${activeFilter === 'rejected' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'} rounded-full text-sm`}
          onClick={() => setActiveFilter('rejected')}
        >
          Rechazados 
          <span className="ml-1 text-xs">{getCountByStatus('rejected')}</span>
        </button>
        <button 
          className={`px-3 py-1 ${activeFilter === 'modified' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'} rounded-full text-sm`}
          onClick={() => setActiveFilter('modified')}
        >
          Modificados 
          <span className="ml-1 text-xs">{getCountByStatus('modified')}</span>
        </button>
        <button 
          className={`px-3 py-1 ${activeFilter === 'cancelled' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'} rounded-full text-sm`}
          onClick={() => setActiveFilter('cancelled')}
        >
          Anulados 
          <span className="ml-1 text-xs">{getCountByStatus('cancelled')}</span>
        </button>
        <button 
          className={`px-3 py-1 ${activeFilter === 'myDepartment' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'} rounded-full text-sm`}
          onClick={() => setActiveFilter('myDepartment')}
        >
          Mi dependencia
        </button>
        <button 
          className={`px-3 py-1 ${activeFilter === 'all' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'} rounded-full text-sm`}
          onClick={() => setActiveFilter('all')}
        >
          Todos
        </button>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar disponibilidad..."
            className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm w-64 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
          <Download className="h-4 w-4 mr-1.5" />
          Exportar
        </button>
      </div>
    </div>
  );

  // Barra de acciones masivas
  const BulkActionBar = () => (
    <div className={`bg-teal-50 border-b border-teal-200 p-4 flex justify-between items-center transition-all duration-300 ${showBulkActions ? 'block' : 'hidden'}`}>
      <div className="text-sm text-teal-700">
        <span className="font-medium">{selectedItems.length}</span> disponibilidades seleccionadas
      </div>
      <div className="flex space-x-2">
        <button 
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          onClick={() => showActionModal('bulkApprove')}
        >
          <Check className="h-4 w-4 mr-1.5" />
          Aprobar seleccionadas
        </button>
        <button 
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          onClick={() => showActionModal('bulkReject')}
        >
          <X className="h-4 w-4 mr-1.5" />
          Rechazar seleccionadas
        </button>
        <button 
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
          onClick={() => {
            setSelectedItems([]);
            setShowBulkActions(false);
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );

  // Tabla de solicitudes
  const CDPTable = () => (
    <div className="overflow-auto flex-1 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-10">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded text-teal-600 focus:ring-teal-500 mr-2"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                />
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Solicitud
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descripción
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha creación
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Solicitante
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dependencia
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor total
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Última actualización
            </th>
            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredCDPs.map((cdp) => (
            <tr 
              key={cdp.id} 
              className={`hover:bg-gray-50 ${isSelected(cdp.id) ? 'bg-teal-50' : ''}`}
            >
              <td className="px-4 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  className="rounded text-teal-600 focus:ring-teal-500"
                  checked={isSelected(cdp.id)}
                  onChange={() => toggleSelect(cdp.id)}
                />
              </td>
              <td className="px-4 py-4 whitespace-nowrap cursor-pointer" onClick={() => handleSelectCDP(cdp)}>
                <span className="font-medium text-gray-900">{cdp.number}</span>
              </td>
              <td className="px-4 py-4 cursor-pointer" onClick={() => handleSelectCDP(cdp)}>
                <div className="text-sm text-gray-900 flex items-center">
                  {cdp.description}
                  {cdp.hasMessages && (
                    <span className="ml-2 flex-shrink-0 h-2 w-2 rounded-full bg-blue-600"></span>
                  )}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap cursor-pointer" onClick={() => handleSelectCDP(cdp)}>
                <div className="text-sm text-gray-500">{cdp.creationDate}</div>
              </td>
              <td className="px-4 py-4 cursor-pointer" onClick={() => handleSelectCDP(cdp)}>
                <div className="text-sm text-gray-900">{cdp.requestor}</div>
              </td>
              <td className="px-4 py-4 cursor-pointer" onClick={() => handleSelectCDP(cdp)}>
                <div className="text-sm text-gray-900">{cdp.department}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap cursor-pointer" onClick={() => handleSelectCDP(cdp)}>
                <div className="text-sm font-medium text-gray-900">
                  {cdp.value}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap cursor-pointer" onClick={() => handleSelectCDP(cdp)}>
                <div className="text-xs">
                  <div className="text-gray-500">{cdp.lastUpdate.date}</div>
                  <div className={`
                    mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                    ${cdp.lastUpdate.type === 'new' ? 'bg-blue-100 text-blue-800' : ''}
                    ${cdp.lastUpdate.type === 'message' ? 'bg-purple-100 text-purple-800' : ''}
                    ${cdp.lastUpdate.type === 'approved' ? 'bg-green-100 text-green-800' : ''}
                    ${cdp.lastUpdate.type === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {cdp.lastUpdate.type === 'new' && 'Nueva'}
                    {cdp.lastUpdate.type === 'message' && 'Mensaje'}
                    {cdp.lastUpdate.type === 'approved' && 'Aprobada'}
                    {cdp.lastUpdate.type === 'rejected' && 'Rechazada'}
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-center">
                <div className="flex items-center justify-center space-x-2" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md"
                    onClick={() => handleSelectCDP(cdp)}
                    title="Ver detalles"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Contador de resultados */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
        <div className="text-sm text-gray-500">
          Mostrando <span className="font-medium">{filteredCDPs.length}</span> de <span className="font-medium">{cdpRequests.length}</span> disponibilidades
        </div>
      </div>
    </div>
  );

  // Panel de detalles de CDP
  const DetailPanel = () => {
    if (!showDetailPanel || !selectedCDP) return null;
    
    return (
      <div className="fixed inset-0 z-20 overflow-hidden bg-gray-500 bg-opacity-75">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto relative w-screen max-w-2xl">
              <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                {/* Header */}
                <div className="px-4 py-3 bg-white border-b border-gray-200 sm:px-6 flex justify-between items-center shadow-sm">
                  <div className="flex items-center">
                    <h2 className="text-lg font-medium text-gray-900">
                      {selectedCDP.number}
                    </h2>
                    <div className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                      Por aprobar
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      <button 
                        className={`p-1 text-gray-400 hover:text-gray-600 ${filteredCDPs.findIndex(cdp => cdp.id === selectedCDP.id) === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={goToPreviousCDP}
                        disabled={filteredCDPs.findIndex(cdp => cdp.id === selectedCDP.id) === 0}
                        title="Anterior disponibilidad"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <button 
                        className={`p-1 text-gray-400 hover:text-gray-600 ${filteredCDPs.findIndex(cdp => cdp.id === selectedCDP.id) === filteredCDPs.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={goToNextCDP}
                        disabled={filteredCDPs.findIndex(cdp => cdp.id === selectedCDP.id) === filteredCDPs.length - 1}
                        title="Siguiente disponibilidad"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-gray-500"
                      onClick={closeDetailPanel}
                      title="Cerrar panel"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Tabs */}
                <div className="border-b border-gray-200 bg-white">
                  <div className="px-4 sm:px-6">
                    <nav className="-mb-px flex space-x-6 overflow-x-auto">
                      <button 
                        className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'general' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        onClick={() => setActiveTab('general')}
                      >
                        General
                      </button>
                      <button 
                        className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'rubros' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        onClick={() => setActiveTab('rubros')}
                      >
                        Rubros
                        {selectedCDP.rubros && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                            {selectedCDP.rubros.length}
                          </span>
                        )}
                      </button>
                      <button 
                        className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'documents' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        onClick={() => setActiveTab('documents')}
                      >
                        Documentos
                        {selectedCDP.documents && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                            {selectedCDP.documents.length}
                          </span>
                        )}
                      </button>
                      <button 
                        className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'messages' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        onClick={() => setActiveTab('messages')}
                      >
                        Comunicaciones
                        {selectedCDP.messages && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                            {selectedCDP.messages.length}
                          </span>
                        )}
                      </button>
                      <button 
                        className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'history' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        onClick={() => setActiveTab('history')}
                      >
                        Historial
                      </button>
                    </nav>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  {/* General Tab */}
                  {activeTab === 'general' && (
                    <>
                      {/* Información general */}
                      <div className="mb-6">
                        <h3 className="text-base font-medium text-gray-900 mb-3">Información general</h3>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="col-span-2">
                              <dt className="font-medium text-gray-500">Descripción</dt>
                              <dd className="mt-1 text-gray-900">{selectedCDP.description}</dd>
                            </div>
                            <div>
                              <dt className="font-medium text-gray-500">Fecha de creación</dt>
                              <dd className="mt-1 text-gray-900">{selectedCDP.creationDate}</dd>
                            </div>
                            <div>
                              <dt className="font-medium text-gray-500">Estado</dt>
                              <dd className="mt-1 text-gray-900">Por aprobar</dd>
                            </div>
                            <div>
                              <dt className="font-medium text-gray-500">Valor total</dt>
                              <dd className="mt-1 text-gray-900 font-medium">{selectedCDP.value}</dd>
                            </div>
                            <div>
                              <dt className="font-medium text-gray-500">Cantidad de rubros</dt>
                              <dd className="mt-1 text-gray-900">{selectedCDP.rubros ? selectedCDP.rubros.length : '-'}</dd>
                            </div>
                            <div>
                              <dt className="font-medium text-gray-500">Solicitante</dt>
                              <dd className="mt-1 text-gray-900">{selectedCDP.requestor}</dd>
                            </div>
                            <div>
                              <dt className="font-medium text-gray-500">Dependencia</dt>
                              <dd className="mt-1 text-gray-900">{selectedCDP.department}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                      
                      {/* Rubros Summary */}
                      {selectedCDP.rubros && (
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-base font-medium text-gray-900">Resumen de rubros</h3>
                            <button 
                              className="text-sm text-teal-600 hover:text-teal-800 flex items-center"
                              onClick={() => setActiveTab('rubros')}
                            >
                              <ChevronRight className="h-4 w-4 mr-1" />
                              Ver detalles
                            </button>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="space-y-3">
                              {selectedCDP.rubros.map((rubro) => (
                                <div key={rubro.id} className="flex justify-between items-center">
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{rubro.name}</p>
                                    <p className="text-xs text-gray-500">{rubro.code}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{rubro.formattedAmount}</p>
                                    <p className="text-xs text-gray-500 flex justify-end items-center">
                                      Impacto: 
                                      <span className={`ml-1 font-medium ${
                                        rubro.impact > 70 ? 'text-red-600' : 
                                        rubro.impact > 50 ? 'text-amber-600' : 
                                        'text-green-600'
                                      }`}>
                                        {rubro.impact}%
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Recomendaciones */}
                      <div className="mb-6">
                        <h3 className="text-base font-medium text-gray-900 mb-3">Recomendaciones</h3>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="flex">
                            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-amber-800 mb-2">
                                <span className="font-medium">Impacto presupuestal alto: </span> 
                                Esta solicitud afectará significativamente el saldo disponible en el rubro SERVICIOS TÉCNICOS (62.5%).
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Latest Message */}
                      {selectedCDP.messages && selectedCDP.messages.length > 0 && (
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-base font-medium text-gray-900">Último mensaje</h3>
                            <button 
                              className="text-sm text-teal-600 hover:text-teal-800 flex items-center"
                              onClick={() => setActiveTab('messages')}
                            >
                              <ChevronRight className="h-4 w-4 mr-1" />
                              Ver todos
                            </button>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start">
                              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-medium flex-shrink-0">
                                {selectedCDP.messages[0].userInitials}
                              </div>
                              <div className="ml-3">
                                <div className="flex items-center">
                                  <p className="text-sm font-medium text-gray-900">
                                    {selectedCDP.messages[0].user}
                                  </p>
                                  <span className="ml-2 text-xs text-gray-500">
                                    {selectedCDP.messages[0].role}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">
                                  {selectedCDP.messages[0].date}
                                </p>
                                <p className="text-sm text-gray-800">
                                  {selectedCDP.messages[0].content}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Message form */}
                      <div>
                        <div 
                          className="border rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100"
                          onClick={() => setActiveTab('messages')}
                        >
                          <div className="px-4 py-3 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">
                              Agregar mensaje
                            </span>
                            <MessageSquare className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Rubros Tab */}
                  {activeTab === 'rubros' && selectedCDP.rubros && (
                    <>
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-base font-medium text-gray-900">Rubros presupuestales</h3>
                          <div className="flex items-center space-x-2">
                            {selectedRubros.length > 0 && (
                              <button 
                                className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-red-700 bg-red-50 border border-red-200 hover:bg-red-100"
                                onClick={zeroSelectedRubros}
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                Llevar a cero
                              </button>
                            )}
                            <button 
                              className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100"
                              onClick={() => showActionModal('modify')}
                            >
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              Editar montos
                            </button>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center">
                            <input 
                              type="checkbox" 
                              className="rounded text-teal-600 focus:ring-teal-500 mr-2"
                              checked={selectedRubros.length === selectedCDP.rubros.length}
                              onChange={toggleAllRubros}
                            />
                            <span className="text-sm text-gray-700">
                              {selectedRubros.length === 0 ? 'Seleccionar todos' : `${selectedRubros.length} rubros seleccionados`}
                            </span>
                          </div>
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                                  #
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Código
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Nombre
                                </th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Valor
                                </th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Disponible
                                </th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Impacto
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedCDP.rubros.map((rubro) => (
                                <tr key={rubro.id} className={`hover:bg-gray-50 ${selectedRubros.includes(rubro.id) ? 'bg-teal-50' : ''}`}>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    <input 
                                      type="checkbox" 
                                      className="rounded text-teal-600 focus:ring-teal-500"
                                      checked={selectedRubros.includes(rubro.id)}
                                      onChange={() => toggleRubroSelection(rubro.id)}
                                    />
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <span className="text-sm font-mono text-gray-900">{rubro.code}</span>
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className="text-sm text-gray-900">{rubro.name}</span>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-right">
                                    <span className="text-sm font-medium text-gray-900">{rubro.formattedAmount}</span>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-right">
                                    <span className="text-sm text-gray-600">{rubro.formattedAvailable}</span>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-right">
                                    <span className={`text-sm font-medium ${
                                      rubro.impact > 70 ? 'text-red-600' : 
                                      rubro.impact > 50 ? 'text-amber-600' : 
                                      'text-green-600'
                                    }`}>
                                      {rubro.impact}%
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      {/* Impacto presupuestal */}
                      <div className="mb-6">
                        <h3 className="text-base font-medium text-gray-900 mb-3">Impacto presupuestal</h3>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="space-y-4">
                            {selectedCDP.rubros.map((rubro) => (
                              <div key={rubro.id} className="mb-4">
                                <div className="flex justify-between items-center mb-1">
                                  <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-900">{rubro.name}</span>
                                    {rubro.impact > 70 && (
                                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                        Alto impacto
                                      </span>
                                    )}
                                  </div>
                                  <span className={`text-sm font-medium ${
                                    rubro.impact > 70 ? 'text-red-600' : 
                                    rubro.impact > 50 ? 'text-amber-600' : 
                                    'text-green-600'
                                  }`}>
                                    {rubro.impact}% después de aprobación
                                  </span>
                                </div>
                                
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                                  <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${rubro.impact - (rubro.amount / rubro.available * 100)}%` }}></div>
                                </div>
                                
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>Ejecutado actual: {(rubro.impact - (rubro.amount / rubro.available * 100)).toFixed(1)}%</span>
                                  <span>Esta solicitud: {(rubro.amount / rubro.available * 100).toFixed(1)}%</span>
                                  <span>Disponible después: {(100 - rubro.impact).toFixed(1)}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Documents Tab */}
                  {activeTab === 'documents' && selectedCDP.documents && (
                    <div className="mb-6">
                      <h3 className="text-base font-medium text-gray-900 mb-3">Documentos adjuntos</h3>
                      <div className="space-y-2">
                        {selectedCDP.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                            <FileText className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.size} • {doc.type}</p>
                            </div>
                            <button className="text-teal-600 hover:text-teal-800">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Messages Tab */}
                  {activeTab === 'messages' && (
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-3">Comunicaciones</h3>
                      
                      {/* Messages List */}
                      <div className="space-y-4 mb-6">
                        {selectedCDP.messages && selectedCDP.messages.map((message) => (
                          <div key={message.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start">
                              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-medium flex-shrink-0">
                                {message.userInitials}
                              </div>
                              <div className="ml-3 flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <p className="text-sm font-medium text-gray-900">
                                      {message.user}
                                    </p>
                                    <span className="ml-2 text-xs text-gray-500">
                                      {message.role}
                                    </span>
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {message.date}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-800 mt-1">
                                  {message.content}
                                </p>
                                {message.attachments && message.attachments.length > 0 && (
                                  <div className="mt-2 pt-2 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 mb-1">Archivos adjuntos:</p>
                                    <div className="space-y-1">
                                      {message.attachments.map((attachment, index) => (
                                        <div key={index} className="flex items-center">
                                          <FileText className="h-3.5 w-3.5 text-gray-400 mr-1" />
                                          <span className="text-xs text-gray-600 hover:text-teal-600 cursor-pointer">
                                            {attachment}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Message Form */}
                      <div className="bg-white border border-gray-200 rounded-lg">
                        <div 
                          className={`px-4 py-3 border-b border-gray-200 flex items-center justify-between cursor-pointer ${expandedMessage ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                          onClick={() => setExpandedMessage(!expandedMessage)}
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {expandedMessage ? 'Cerrar editor de mensaje' : 'Agregar mensaje'}
                          </span>
                          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${expandedMessage ? 'transform rotate-180' : ''}`} />
                        </div>
                        
                        {expandedMessage && (
                          <div className="p-4">
                            <div className="mb-4">
                              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                Mensaje
                              </label>
                              <div className="relative">
                                <textarea
                                  id="message"
                                  rows={4}
                                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                  placeholder="Escriba su mensaje aquí..."
                                  value={messageText}
                                  onChange={(e) => setMessageText(e.target.value)}
                                ></textarea>
                                <button 
                                  className="absolute bottom-2 right-2 p-1 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded"
                                  onClick={suggestText}
                                  title="Sugerir texto con IA"
                                >
                                  <Sparkles className="h-4 w-4" />
                                </button>
                              </div>
                              {aiSuggestion && (
                                <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-md relative">
                                  <button 
                                    className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 p-1"
                                    onClick={() => setAiSuggestion('')}
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                  <div className="flex items-start">
                                    <Sparkles className="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                                    <div>
                                      <p className="text-xs font-medium text-purple-800 mb-1">Sugerencia de IA:</p>
                                      <p className="text-xs text-purple-700">{aiSuggestion}</p>
                                      <button 
                                        className="mt-2 text-xs text-purple-700 font-medium hover:text-purple-900 inline-flex items-center"
                                        onClick={applySuggestion}
                                      >
                                        <PenTool className="h-3 w-3 mr-1" />
                                        Aplicar sugerencia
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between mt-3">
                              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                <Plus className="h-4 w-4 mr-1.5" />
                                Adjuntar archivo
                              </button>
                              <button className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                <Send className="h-4 w-4 mr-1.5" />
                                Enviar mensaje
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* History Tab */}
                  {activeTab === 'history' && (
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-3">Historial de la solicitud</h3>
                      <div className="flow-root">
                        <ul className="-mb-8">
                          {selectedCDP.history.map((event, index) => (
                            <li key={index}>
                              <div className="relative pb-8">
                                {index !== selectedCDP.history.length - 1 && (
                                  <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                )}
                                <div className="relative flex items-start space-x-3">
                                  <div>
                                    <div className="relative px-1">
                                      <div className="h-10 w-10 bg-blue-100 rounded-full ring-8 ring-white flex items-center justify-center">
                                        <User className="h-5 w-5 text-blue-600" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="min-w-0 flex-1 py-1.5">
                                    <div className="text-sm text-gray-500">
                                      <span className="font-medium text-gray-900">{event.user}</span> ({event.role}) {event.action.toLowerCase()} la solicitud
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500">
                                      {event.date} • Estado: {event.status}
                                    </div>
                                    {event.comment && (
                                      <div className="mt-2 text-sm italic text-gray-600">
                                        "{event.comment}"
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                          <li>
                            <div className="relative">
                              <div className="relative flex items-start space-x-3">
                                <div>
                                  <div className="relative px-1">
                                    <div className="h-10 w-10 bg-yellow-100 rounded-full ring-8 ring-white flex items-center justify-center">
                                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                                    </div>
                                  </div>
                                </div>
                                <div className="min-w-0 flex-1 py-1.5">
                                  <div className="text-sm text-gray-500">
                                    <span className="font-medium text-gray-900">Pendiente de aprobación</span>
                                  </div>
                                  <div className="mt-1 text-xs text-gray-500">En espera de su revisión</div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Action buttons */}
                <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 sm:px-6 flex justify-end gap-3 sticky bottom-0">
                  <button 
                    className="inline-flex items-center px-3 py-2 border border-red-300 text-red-700 bg-white rounded-md shadow-sm hover:bg-red-50"
                    onClick={() => showActionModal('reject')}
                  >
                    <X className="h-4 w-4 mr-1.5" />
                    Rechazar
                  </button>
                  <button 
                    className="inline-flex items-center px-3 py-2 border border-blue-300 text-blue-700 bg-white rounded-md shadow-sm hover:bg-blue-50"
                    onClick={() => showActionModal('modify')}
                  >
                    <Edit className="h-4 w-4 mr-1.5" />
                    Modificar
                  </button>
                  <button 
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50"
                    onClick={() => showActionModal('cancel')}
                  >
                    <Archive className="h-4 w-4 mr-1.5" />
                    Anular
                  </button>
                  <button 
                    className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700"
                    onClick={() => showActionModal('approve')}
                  >
                    <Check className="h-4 w-4 mr-1.5" />
                    Aprobar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Ventana modal para acciones
  const ConfirmationModal = () => {
    if (!showConfirmModal) return null;
    
    let title, description, isRequired = false, requireSign = false, requireConfirmation = false;
    
    switch (modalAction) {
      case 'approve':
        title = 'Aprobar disponibilidad';
        description = '¿Está seguro que desea aprobar esta disponibilidad?';
        requireSign = true;
        break;
      case 'reject':
        title = 'Rechazar disponibilidad';
        description = '¿Está seguro que desea rechazar esta disponibilidad? El elaborador deberá realizar las correcciones solicitadas.';
        isRequired = true;
        break;
      case 'modify':
        title = 'Modificar disponibilidad';
        description = '¿Está seguro que desea modificar los valores de esta disponibilidad?';
        isRequired = true;
        break;
      case 'cancel':
        title = 'Anular disponibilidad';
        description = '¿Está seguro que desea anular esta disponibilidad? Esta acción liberará los recursos comprometidos.';
        isRequired = true;
        break;
      case 'zeroRubros':
        title = 'Llevar rubros a cero';
        description = `¿Está seguro que desea llevar a cero ${selectedRubros.length} rubro(s) seleccionado(s)? Esta acción es equivalente a anular parcialmente la disponibilidad.`;
        isRequired = true;
        break;
      case 'bulkApprove':
        title = 'Aprobar solicitudes seleccionadas';
        description = `¿Está seguro que desea aprobar ${selectedItems.length} disponibilidades seleccionadas?`;
        requireConfirmation = true;
        break;
      case 'bulkReject':
        title = 'Rechazar solicitudes seleccionadas';
        description = `¿Está seguro que desea rechazar ${selectedItems.length} disponibilidades seleccionadas?`;
        isRequired = true;
        break;
      default:
        title = 'Confirmar acción';
        description = '¿Está seguro que desea realizar esta acción?';
    }
    
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-30">
        <div className="bg-white rounded-lg max-w-md w-full shadow-xl overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <button 
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setShowConfirmModal(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-4">
            <p className="text-gray-700 mb-4">{description}</p>
            
            {selectedCDP && (
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm mb-4">
                <p><span className="font-medium">Consecutivo:</span> {selectedCDP.number}</p>
                <p><span className="font-medium">Descripción:</span> {selectedCDP.description}</p>
                <p><span className="font-medium">Valor total:</span> {selectedCDP.value}</p>
              </div>
            )}
            
            {/* Justificación */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Justificación {isRequired && <span className="text-red-500">*</span>}
                </label>
                <button 
                  className="text-xs text-teal-600 hover:text-teal-800 flex items-center"
                  onClick={suggestText}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  Sugerir con IA
                </button>
              </div>
              <textarea 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                rows="3"
                placeholder={`Escriba su justificación para ${
                  modalAction === 'approve' ? 'la aprobación' : 
                  modalAction === 'reject' ? 'el rechazo' :
                  modalAction === 'modify' ? 'la modificación' :
                  modalAction === 'cancel' ? 'la anulación' :
                  modalAction === 'zeroRubros' ? 'llevar a cero estos rubros' :
                  'esta acción'
                }...`}
                required={isRequired}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              ></textarea>
              {aiSuggestion && (
                <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-md relative">
                  <button 
                    className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 p-1"
                    onClick={() => setAiSuggestion('')}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div className="flex items-start">
                    <Sparkles className="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-purple-800 mb-1">Sugerencia de IA:</p>
                      <p className="text-xs text-purple-700">{aiSuggestion}</p>
                      <button 
                        className="mt-2 text-xs text-purple-700 font-medium hover:text-purple-900 inline-flex items-center"
                        onClick={applySuggestion}
                      >
                        <PenTool className="h-3 w-3 mr-1" />
                        Aplicar sugerencia
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {isRequired && (
                <p className="mt-1 text-xs text-gray-500">Este campo es obligatorio.</p>
              )}
            </div>
            
            {/* Firma digital */}
            {requireSign && (
              <div className="mb-4">
                <div className="mb-2 flex items-start bg-blue-50 p-3 rounded-lg">
                  <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                  <p className="text-sm text-blue-700">
                    Esta acción requiere firma digital como verificación final. Al firmar, usted confirma su autorización como oficial de presupuesto.
                  </p>
                </div>
                <button className="w-full flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700">
                  <PenTool className="h-4 w-4 mr-1.5" />
                  Firmar digitalmente
                </button>
              </div>
            )}
            
            {/* Confirmación de verificación */}
            {requireConfirmation && (
              <div className="flex items-start mb-4">
                <input 
                  type="checkbox" 
                  id="confirm-verification" 
                  className="mt-1 h-4 w-4 rounded text-teal-600 focus:ring-teal-500 mr-2" 
                />
                <label htmlFor="confirm-verification" className="text-sm text-gray-700">
                  Confirmo que he verificado la información y los documentos adjuntos de todas las disponibilidades seleccionadas, y autorizo esta acción masiva.
                </label>
              </div>
            )}
          </div>
          
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              className={`px-4 py-2 rounded-md text-white ${
                modalAction === 'approve' || modalAction === 'bulkApprove' ? 'bg-green-600 hover:bg-green-700' : 
                modalAction === 'reject' || modalAction === 'bulkReject' ? 'bg-red-600 hover:bg-red-700' :
                modalAction === 'modify' ? 'bg-blue-600 hover:bg-blue-700' :
                modalAction === 'cancel' || modalAction === 'zeroRubros' ? 'bg-gray-700 hover:bg-gray-800' :
                'bg-teal-600 hover:bg-teal-700'
              }`}
              onClick={() => {
                setShowConfirmModal(false);
                if (modalAction === 'bulkApprove' || modalAction === 'bulkReject') {
                  setSelectedItems([]);
                  setShowBulkActions(false);
                }
              }}
            >
              Confirmar {
                modalAction === 'approve' || modalAction === 'bulkApprove' ? 'aprobación' : 
                modalAction === 'reject' || modalAction === 'bulkReject' ? 'rechazo' :
                modalAction === 'modify' ? 'modificación' :
                modalAction === 'cancel' ? 'anulación' :
                modalAction === 'zeroRubros' ? 'llevar a cero' :
                'acción'
              }
            </button>
          </div>
        </div>
      </div>
    );
  };

  // System Info Chip
  const SystemInfoChip = () => (
    <div className="fixed bottom-2 right-2 z-10">
      <div className="flex items-center bg-white border border-gray-200 rounded-full py-1 px-3 text-xs text-gray-600 shadow-sm cursor-pointer hover:bg-gray-50">
        <Calendar className="h-3 w-3 mr-1 text-teal-600" />
        <span>27/03/2025</span>
        <span className="mx-1.5 h-1 w-1 bg-gray-300 rounded-full"></span>
        <span>v3.5.2</span>
      </div>
    </div>
  );

  // Componente principal
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <Breadcrumbs />
      <Dashboard />
      <FilterBar />
      {showBulkActions && <BulkActionBar />}
      <CDPTable />
      <DetailPanel />
      <ConfirmationModal />
      <SystemInfoChip />
    </div>
  );
};

export default CDPManagementSystem;
