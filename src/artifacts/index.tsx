import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Award, MessageSquare, Save, FileText, Download, Plus, Edit, Trash2, Tag, X, Check, ChevronDown, ChevronUp } from 'lucide-react';

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

// Helper to get today's date in YYYY-MM-DD format
const today = formatDate(new Date());

// Main component
const ShadowDocTracker = () => {
  // Main state for all entries
  const [entries, setEntries] = useState([]);
  
  // State for the current entry being added/edited
  const [currentEntry, setCurrentEntry] = useState({
    id: null,
    date: today,
    activity: '',
    impact: '',
    testimonials: '',
    hours: '',
    category: 'Diseño',
    isEdit: false
  });
  
  // State for export options
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  // State for filtering and sorting
  const [filter, setFilter] = useState('all');
  const [sortDirection, setSortDirection] = useState('desc'); // newest first
  const [expandedEntry, setExpandedEntry] = useState(null);

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('shadowDocEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('shadowDocEntries', JSON.stringify(entries));
  }, [entries]);

  // Handle input changes for the current entry
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEntry({
      ...currentEntry,
      [name]: value
    });
  };

  // Submit handler for adding/updating entries
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentEntry.isEdit) {
      // Update existing entry
      setEntries(entries.map(entry => 
        entry.id === currentEntry.id ? 
          { ...currentEntry, isEdit: false } : 
          entry
      ));
    } else {
      // Add new entry
      const newEntry = {
        ...currentEntry,
        id: Date.now(), // Simple unique ID
        isEdit: false
      };
      setEntries([...entries, newEntry]);
    }
    
    // Reset form
    setCurrentEntry({
      id: null,
      date: today,
      activity: '',
      impact: '',
      testimonials: '',
      hours: '',
      category: 'Diseño',
      isEdit: false
    });
  };

  // Handle editing an entry
  const handleEdit = (id) => {
    const entryToEdit = entries.find(entry => entry.id === id);
    setCurrentEntry({
      ...entryToEdit,
      isEdit: true
    });
    setExpandedEntry(null);
  };

  // Handle deleting an entry
  const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  // Toggle entry expansion
  const toggleExpand = (id) => {
    setExpandedEntry(expandedEntry === id ? null : id);
  };

  // Filter entries based on category
  const filteredEntries = entries.filter(entry => 
    filter === 'all' || entry.category === filter
  );

  // Sort entries by date
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortDirection === 'asc') {
      return new Date(a.date) - new Date(b.date);
    }
    return new Date(b.date) - new Date(a.date);
  });

  // Group entries by date
  const groupedEntries = sortedEntries.reduce((groups, entry) => {
    if (!groups[entry.date]) {
      groups[entry.date] = [];
    }
    groups[entry.date].push(entry);
    return groups;
  }, {});

  // Export entries as plain text
  const exportAsText = () => {
    let text = "# SHADOW DOCUMENTATION: CONTRIBUTIONS AND IMPACT\n\n";
    
    // Group by category and sort by date for export
    const categorizedEntries = {
      'Documentación': entries.filter(entry => entry.category === 'Documentación'),
      'Diseño': entries.filter(entry => entry.category === 'Diseño'),
      'UX Research': entries.filter(entry => entry.category === 'UX Research'),
      'Metodología': entries.filter(entry => entry.category === 'Metodología'),
      'Liderazgo': entries.filter(entry => entry.category === 'Liderazgo'),
      'Mentoría': entries.filter(entry => entry.category === 'Mentoría'),
      'Innovación': entries.filter(entry => entry.category === 'Innovación'),
      'Desarrollo': entries.filter(entry => entry.category === 'Desarrollo'),
      'Otro': entries.filter(entry => entry.category === 'Otro')
    };
    
    Object.entries(categorizedEntries).forEach(([category, categoryEntries]) => {
      if (categoryEntries.length > 0) {
        text += `## ${category} Contributions\n\n`;
        
        // Sort by date
        const sortedCategoryEntries = [...categoryEntries].sort((a, b) => 
          new Date(a.date) - new Date(b.date)
        );
        
        sortedCategoryEntries.forEach(entry => {
          text += `### ${entry.date} - ${entry.activity}\n\n`;
          text += `**Impact:** ${entry.impact}\n\n`;
          
          if (entry.testimonials) {
            text += `**Testimonials:** "${entry.testimonials}"\n\n`;
          }
          
          text += `**Hours Invested:** ${entry.hours}\n\n`;
          text += `---\n\n`;
        });
      }
    });
    
    return text;
  };

  // Export with system prompt
  const exportWithPrompt = () => {
    const documentText = exportAsText();
    
    const systemPrompt = `
# SYSTEM PROMPT: ORGANIZAR Y ANALIZAR CONTRIBUCIONES PROFESIONALES POR CATEGORÍAS

Eres un analista experto en desarrollo profesional. Tu tarea es revisar la siguiente documentación de contribuciones profesionales y organizarla en una narrativa convincente que demuestre claramente el valor y el impacto, clasificando adecuadamente por tipos de actividad.

Por favor:

1. Agrupa las actividades relacionadas en iniciativas estratégicas, respetando las categorías (Diseño, UX Research, Documentación, etc.)
2. Identifica patrones que demuestren multidisciplinariedad y versatilidad profesional
3. Cuantifica el impacto donde sea posible (tiempo ahorrado, procesos mejorados, etc.)
4. Desarrolla 3-5 puntos narrativos clave que demuestren valor más allá de la descripción del puesto
5. Sugiere cómo enmarcar estas contribuciones en una negociación de salario/promoción, destacando la amplitud de habilidades
6. Formatea todo en un documento profesional bien estructurado con secciones claras por tipo de actividad

El objetivo es transformar esta documentación en bruto en un activo estratégico para el avance profesional, demostrando un perfil versátil y de alto impacto en múltiples áreas.

## DOCUMENTATION
${documentText}
`;

    return systemPrompt;
  };

  // Copy to clipboard function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="mx-auto max-w-4xl p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Shadow Documentation Tracker</h1>
        <p className="text-gray-600">Record your contributions, impact, and value added beyond your job description</p>
      </div>
      
      {/* Entry Form */}
      <div className="bg-white p-5 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {currentEntry.isEdit ? 'Edit Entry' : 'Add New Entry'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={currentEntry.date}
                  onChange={handleInputChange}
                  className="pl-9 w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <div className="relative">
                <select
                  name="category"
                  value={currentEntry.category}
                  onChange={handleInputChange}
                  className="pl-9 w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm appearance-none"
                  required
                >
                  <option value="Documentación">Documentación</option>
                  <option value="Diseño">Diseño</option>
                  <option value="UX Research">UX Research</option>
                  <option value="Metodología">Metodología</option>
                  <option value="Liderazgo">Liderazgo</option>
                  <option value="Mentoría">Mentoría/Formación</option>
                  <option value="Innovación">Innovación/Propuestas</option>
                  <option value="Desarrollo">Desarrollo</option>
                  <option value="Otro">Otro</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
            <input
              type="text"
              name="activity"
              value={currentEntry.activity}
              onChange={handleInputChange}
              placeholder="What did you do? Be specific and concrete"
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
            <textarea
              name="impact"
              value={currentEntry.impact}
              onChange={handleInputChange}
              placeholder="How did this create value? What problems did it solve? Any metrics?"
              rows="3"
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              required
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Testimonials/Feedback</label>
            <textarea
              name="testimonials"
              value={currentEntry.testimonials}
              onChange={handleInputChange}
              placeholder="Any positive feedback or comments you received? Quote verbatim if possible"
              rows="2"
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hours Invested</label>
            <div className="relative">
              <input
                type="text"
                name="hours"
                value={currentEntry.hours}
                onChange={handleInputChange}
                placeholder="Estimate of time spent (e.g., 4 hrs, 2 days)"
                className="pl-9 w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            {currentEntry.isEdit && (
              <button
                type="button"
                onClick={() => setCurrentEntry({
                  id: null,
                  date: today,
                  activity: '',
                  impact: '',
                  testimonials: '',
                  hours: '',
                  category: 'Diseño',
                  isEdit: false
                })}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none flex items-center"
            >
              <Save className="h-4 w-4 mr-1.5" />
              {currentEntry.isEdit ? 'Update Entry' : 'Save Entry'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Controls for entries */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="text-sm font-medium text-gray-700">Filter by: </div>
          <select
              className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 focus:ring-teal-500 focus:border-teal-500 sm:text-sm appearance-none bg-white"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Todos los tipos</option>
              <option value="Documentación">Documentación</option>
              <option value="Diseño">Diseño</option>
              <option value="UX Research">UX Research</option>
              <option value="Metodología">Metodología</option>
              <option value="Liderazgo">Liderazgo</option>
              <option value="Mentoría">Mentoría/Formación</option>
              <option value="Innovación">Innovación/Propuestas</option>
              <option value="Desarrollo">Desarrollo</option>
              <option value="Otro">Otro</option>
            </select>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1 text-sm bg-white text-gray-700 rounded-md flex items-center hover:bg-gray-50"
            onClick={() => setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')}
          >
            {sortDirection === 'desc' ? (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Newest first
              </>
            ) : (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Oldest first
              </>
            )}
          </button>
          
          <button 
            className="px-3 py-1 text-sm bg-teal-600 text-white rounded-md flex items-center hover:bg-teal-700"
            onClick={() => setShowExportOptions(!showExportOptions)}
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
        </div>
      </div>
      
      {/* Export options dropdown */}
      {showExportOptions && (
        <div className="bg-white rounded-md shadow-lg mb-4 overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium text-gray-700">Export Options</h3>
          </div>
          <div className="p-4 space-y-3">
            <button 
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => copyToClipboard(exportAsText())}
            >
              <FileText className="h-4 w-4 mr-2 text-gray-500" />
              Copy as Plain Text
            </button>
            <button 
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => copyToClipboard(exportWithPrompt())}
            >
              <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
              Copy with System Prompt
            </button>
          </div>
        </div>
      )}
      
      {/* Entries List */}
      <div className="space-y-6">
        {Object.keys(groupedEntries).length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <div className="text-gray-400 mx-auto h-16 w-16 mb-4">
              <FileText className="h-16 w-16" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No entries yet</h3>
            <p className="text-gray-500 mb-4">Start documenting your contributions by adding your first entry above.</p>
          </div>
        ) : (
          Object.keys(groupedEntries).map(date => (
            <div key={date} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b flex justify-between items-center">
                <div className="font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  {date}
                </div>
                <div className="text-sm text-gray-500">
                  {groupedEntries[date].length} {groupedEntries[date].length === 1 ? 'entry' : 'entries'}
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {groupedEntries[date].map(entry => (
                  <div key={entry.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            entry.category === 'Documentación' ? 'bg-gray-100 text-gray-800' :
                            entry.category === 'Diseño' ? 'bg-purple-100 text-purple-800' :
                            entry.category === 'UX Research' ? 'bg-pink-100 text-pink-800' :
                            entry.category === 'Metodología' ? 'bg-blue-100 text-blue-800' :
                            entry.category === 'Liderazgo' ? 'bg-green-100 text-green-800' :
                            entry.category === 'Mentoría' ? 'bg-amber-100 text-amber-800' :
                            entry.category === 'Innovación' ? 'bg-indigo-100 text-indigo-800' :
                            entry.category === 'Desarrollo' ? 'bg-cyan-100 text-cyan-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {entry.category}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 cursor-pointer" onClick={() => toggleExpand(entry.id)}>
                            {entry.activity}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">Hours: {entry.hours}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button 
                          className="p-1 text-gray-400 hover:text-teal-600"
                          onClick={() => toggleExpand(entry.id)}
                        >
                          {expandedEntry === entry.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-blue-600"
                          onClick={() => handleEdit(entry.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-red-600"
                          onClick={() => handleDelete(entry.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    {expandedEntry === entry.id && (
                      <div className="mt-3 pl-10">
                        <div className="bg-gray-50 p-3 rounded-md">
                          <div className="mb-2">
                            <span className="text-xs font-medium text-gray-500">Impact:</span>
                            <p className="text-sm text-gray-700 mt-1">{entry.impact}</p>
                          </div>
                          
                          {entry.testimonials && (
                            <div>
                              <span className="text-xs font-medium text-gray-500">Testimonials:</span>
                              <p className="text-sm text-gray-700 mt-1 italic">"{entry.testimonials}"</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Stats and counts */}
      {entries.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-700 mb-2">Resumen de Actividades</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total</span>
                <span className="font-medium text-lg">{entries.length}</span>
              </div>
            </div>
            
            {/* Mostrar las 5 categorías más utilizadas */}
            {['Diseño', 'UX Research', 'Documentación', 'Metodología', 'Liderazgo'].map(cat => {
              const count = entries.filter(e => e.category === cat).length;
              if (count > 0) {
                return (
                  <div key={cat} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{cat}</span>
                      <span className="font-medium text-lg">{count}</span>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
      
      {/* Help text */}
      <div className="mt-6 text-sm text-gray-500">
        <p>💡 <strong>Pro tip:</strong> Registra tus contribuciones diariamente, incluso las pequeñas. Al categorizar por tipo de actividad, crearás un mapa claro de tus aportes que será invaluable para tu caso de negociación salarial.</p>
      </div>
    </div>
  );
};

export default ShadowDocTracker;