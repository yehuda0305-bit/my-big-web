import React, { useState } from 'react';
import { Copy, Download, Trash2, Plus, Eye, Code, Palette } from 'lucide-react';

const WebsiteBuilder = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      type: 'hero',
      title: 'Welcome to My Site',
      subtitle: 'Build something amazing',
      bgColor: '#6366f1',
      textColor: '#ffffff'
    }
  ]);

  const [selectedId, setSelectedId] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [theme, setTheme] = useState('dark');

  const addSection = (type) => {
    const newId = Math.max(...sections.map(s => s.id), 0) + 1;
    const defaultConfigs = {
      hero: { type: 'hero', title: 'New Hero', subtitle: 'Your subtitle here', bgColor: '#6366f1', textColor: '#ffffff' },
      features: { type: 'features', title: 'Features', items: ['Feature 1', 'Feature 2', 'Feature 3'], bgColor: '#ffffff', textColor: '#1f2937' },
      cta: { type: 'cta', title: 'Ready to Start?', buttonText: 'Get Started', bgColor: '#ec4899', textColor: '#ffffff' },
      footer: { type: 'footer', text: '© 2024 My Website. All rights reserved.', bgColor: '#0f172a', textColor: '#94a3b8' }
    };
    setSections([...sections, { id: newId, ...defaultConfigs[type] }]);
    setSelectedId(newId);
  };

  const updateSection = (id, updates) => {
    setSections(sections.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
    setSelectedId(sections[0]?.id || null);
  };

  const selected = sections.find(s => s.id === selectedId);

  const generateHTML = () => {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; }
        .section { padding: 80px 40px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .hero { text-align: center; display: flex; flex-direction: column; justify-content: center; min-height: 600px; }
        .hero h1 { font-size: 4rem; margin-bottom: 20px; font-weight: bold; }
        .hero p { font-size: 1.5rem; opacity: 0.9; }
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; }
        .feature-card { padding: 30px; border-radius: 12px; text-align: center; }
        .feature-card h3 { margin-bottom: 10px; font-size: 1.3rem; }
        .cta { text-align: center; padding: 100px 40px; }
        .cta h2 { font-size: 2.5rem; margin-bottom: 30px; }
        .btn { padding: 15px 40px; font-size: 1.1rem; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; transition: transform 0.2s; }
        .btn:hover { transform: scale(1.05); }
        footer { padding: 40px; text-align: center; }
    </style>
</head>
<body>
`;

    sections.forEach(section => {
      if (section.type === 'hero') {
        html += `    <div class="section hero" style="background-color: ${section.bgColor}; color: ${section.textColor};">
        <div class="container">
            <h1>${section.title}</h1>
            <p>${section.subtitle}</p>
        </div>
    </div>\n`;
      } else if (section.type === 'features') {
        html += `    <div class="section" style="background-color: ${section.bgColor}; color: ${section.textColor};">
        <div class="container">
            <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 50px;">${section.title}</h2>
            <div class="features">
${section.items.map(item => `                <div class="feature-card"><h3>${item}</h3><p>Add your feature description here</p></div>`).join('\n')}
            </div>
        </div>
    </div>\n`;
      } else if (section.type === 'cta') {
        html += `    <div class="section cta" style="background-color: ${section.bgColor}; color: ${section.textColor};">
        <div class="container">
            <h2>${section.title}</h2>
            <button class="btn" style="background-color: ${section.textColor}; color: ${section.bgColor};">${section.buttonText}</button>
        </div>
    </div>\n`;
      } else if (section.type === 'footer') {
        html += `    <footer style="background-color: ${section.bgColor}; color: ${section.textColor};">${section.text}</footer>\n`;
      }
    });

    html += `</body>
</html>`;
    return html;
  };

  const downloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateHTML());
    alert('HTML copied to clipboard!');
  };

  const PreviewComponent = ({ section }) => {
    if (section.type === 'hero') {
      return (
        <div style={{ backgroundColor: section.bgColor, color: section.textColor, padding: '60px 20px', textAlign: 'center', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{section.title}</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{section.subtitle}</p>
        </div>
      );
    } else if (section.type === 'features') {
      return (
        <div style={{ backgroundColor: section.bgColor, color: section.textColor, padding: '40px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>{section.title}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
            {section.items.map((item, i) => (
              <div key={i} style={{ padding: '15px', backgroundColor: section.textColor === '#ffffff' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (section.type === 'cta') {
      return (
        <div style={{ backgroundColor: section.bgColor, color: section.textColor, padding: '60px 20px', textAlign: 'center', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '1.8rem' }}>{section.title}</h3>
          <button style={{ padding: '12px 30px', backgroundColor: section.textColor, color: section.bgColor, border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
            {section.buttonText}
          </button>
        </div>
      );
    } else if (section.type === 'footer') {
      return (
        <div style={{ backgroundColor: section.bgColor, color: section.textColor, padding: '30px', textAlign: 'center', borderRadius: '12px' }}>
          {section.text}
        </div>
      );
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Geist Sans', system-ui, sans-serif", backgroundColor: theme === 'dark' ? '#0f172a' : '#f9fafb', color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>
      {/* Sidebar */}
      <div style={{ width: '300px', borderRight: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`, overflow: 'auto', padding: '20px', backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Builder</h1>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '1.2rem' }}>
            🌙
          </button>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6, marginBottom: '10px' }}>Add Section</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {['hero', 'features', 'cta', 'footer'].map(type => (
              <button key={type} onClick={() => addSection(type)} style={{ padding: '10px', backgroundColor: '#6366f1', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, textTransform: 'capitalize', transition: 'all 0.2s' }} onMouseEnter={e => e.target.style.backgroundColor = '#4f46e5'} onMouseLeave={e => e.target.style.backgroundColor = '#6366f1'}>
                + {type}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}` }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6, marginBottom: '10px' }}>Sections</p>
          {sections.map(section => (
            <div key={section.id} onClick={() => setSelectedId(section.id)} style={{ padding: '10px', marginBottom: '8px', backgroundColor: selectedId === section.id ? '#6366f1' : (theme === 'dark' ? '#1e293b' : '#f3f4f6'), borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'capitalize', fontWeight: selectedId === section.id ? 600 : 400, fontSize: '0.95rem' }}>
              {section.type}
            </div>
          ))}
        </div>

        {selected && (
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6, marginBottom: '10px' }}>Edit Section</p>
            {selected.type === 'hero' && (
              <>
                <input type="text" placeholder="Title" value={selected.title} onChange={e => updateSection(selectedId, { title: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`, backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', color: 'inherit' }} />
                <input type="text" placeholder="Subtitle" value={selected.subtitle} onChange={e => updateSection(selectedId, { subtitle: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`, backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', color: 'inherit' }} />
              </>
            )}
            {selected.type === 'features' && (
              <>
                <input type="text" placeholder="Title" value={selected.title} onChange={e => updateSection(selectedId, { title: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`, backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', color: 'inherit' }} />
                {selected.items.map((item, i) => (
                  <input key={i} type="text" value={item} onChange={e => {
                    const newItems = [...selected.items];
                    newItems[i] = e.target.value;
                    updateSection(selectedId, { items: newItems });
                  }} style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '6px', border: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`, backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', color: 'inherit' }} />
                ))}
              </>
            )}
            {selected.type === 'cta' && (
              <>
                <input type="text" placeholder="Title" value={selected.title} onChange={e => updateSection(selectedId, { title: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`, backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', color: 'inherit' }} />
                <input type="text" placeholder="Button Text" value={selected.buttonText} onChange={e => updateSection(selectedId, { buttonText: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`, backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', color: 'inherit' }} />
              </>
            )}
            {selected.type === 'footer' && (
              <input type="text" placeholder="Footer text" value={selected.text} onChange={e => updateSection(selectedId, { text: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`, backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', color: 'inherit' }} />
            )}

            <div style={{ marginTop: '15px', marginBottom: '10px' }}>
              <label style={{ fontSize: '0.85rem', display: 'block', marginBottom: '5px', fontWeight: 500 }}>Background</label>
              <input type="color" value={selected.bgColor} onChange={e => updateSection(selectedId, { bgColor: e.target.value })} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: 'none', cursor: 'pointer', height: '40px' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '0.85rem', display: 'block', marginBottom: '5px', fontWeight: 500 }}>Text Color</label>
              <input type="color" value={selected.textColor} onChange={e => updateSection(selectedId, { textColor: e.target.value })} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: 'none', cursor: 'pointer', height: '40px' }} />
            </div>

            <button onClick={() => deleteSection(selectedId)} style={{ width: '100%', padding: '10px', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Trash2 size={16} /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Toolbar */}
        <div style={{ borderBottom: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`, padding: '15px 25px', display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setPreviewMode(!previewMode)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: previewMode ? '#6366f1' : (theme === 'dark' ? '#1e293b' : '#f3f4f6'), color: previewMode ? '#ffffff' : 'inherit', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>
              <Eye size={18} /> {previewMode ? 'Editing' : 'Preview'}
            </button>
            <button onClick={copyCode} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: theme === 'dark' ? '#1e293b' : '#f3f4f6', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>
              <Copy size={18} /> Copy Code
            </button>
            <button onClick={downloadHTML} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#10b981', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>
              <Download size={18} /> Export
            </button>
          </div>
          <a href="https://pay.grow.link/e8257ae983a22f3753bfc58fe616696a-MjQxNDcxOA" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#f59e0b', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => e.target.style.backgroundColor = '#d97706'} onMouseLeave={e => e.target.style.backgroundColor = '#f59e0b'}>
            ❤️ Support Me
          </a>
        </div>

        {/* Preview Area */}
        <div style={{ flex: 1, overflow: 'auto', padding: '30px', backgroundColor: theme === 'dark' ? '#1e293b' : '#f3f4f6' }}>
          {previewMode ? (
            <iframe srcDoc={generateHTML()} style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px', backgroundColor: '#ffffff' }} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {sections.map(section => (
                <div key={section.id} onClick={() => setSelectedId(section.id)} style={{ cursor: 'pointer', opacity: selectedId === section.id ? 1 : 0.6, transition: 'opacity 0.2s' }}>
                  <PreviewComponent section={section} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;
