import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BuscaFIPE() {
  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carYears, setCarYears] = useState([]);
  const [carValue, setCarValue] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    // Marca
    axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas')
      .then(response => setCarBrands(response.data))
      .catch(error => console.error('Erro na busca de marca:', error));
  }, []);

  useEffect(() => {
    // Modelo
    if (selectedBrand) {
      axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos`)
        .then(response => setCarModels(response.data.modelos))
        .catch(error => console.error('Erro na busca de modelo:', error));
    }
  }, [selectedBrand]);

  useEffect(() => {
    // Ano
    if (selectedBrand && selectedModel) {
      axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos/${selectedModel}/anos`)
        .then(response => setCarYears(response.data))
        .catch(error => console.error('Erro na busca de ano:', error));
    }
  }, [selectedBrand, selectedModel]);

  useEffect(() => {
    // Valor
    if (selectedBrand && selectedModel && selectedYear) {
      axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos/${selectedModel}/anos/${selectedYear}`)
        .then(response => setCarValue(response.data.Valor))
        .catch(error => console.error('Erro na busca do valor:', error));
    }
  }, [selectedBrand, selectedModel, selectedYear]);

  // Resetar ao trocar a marca
    const handleBrandChange = (event) => {
    const newSelectedBrand = event.target.value;
    setSelectedBrand(newSelectedBrand);
    
    setSelectedModel('');
    setSelectedYear('');
    setCarValue('');
  };

  // Resetar ao trocar modelo 
    const handleModelChange = (event) => {
    const newSelectedModel = event.target.value;
    setSelectedModel(newSelectedModel);
    
    setSelectedYear('');
    setCarValue('');
  };

  // Resetar ao trocar ano
    const handleYearChange = (event) => {
    const newSelectedYear = event.target.value;
    setSelectedYear(newSelectedYear);
    setCarValue('');
  };

  return (
    <div className="App">
      <h1>Consulte a tabela FIPE</h1>

      <label>Marca:</label>
      <select value={selectedBrand} onChange={handleBrandChange}>
        <option  value="">Selecione a marca</option>
        {carBrands.map(brand => (
          <option className="options" key={brand.codigo} value={brand.codigo}>
            {brand.nome}
          </option>
        ))}
      </select>

      {selectedBrand && (
        <div>
          <label>Modelo:</label>
          <select value={selectedModel} onChange={handleModelChange}>
            <option value="">Selecione o modelo</option>
            {carModels.map(model => (
              <option className="options" key={model.codigo} value={model.codigo}>
                {model.nome}
              </option>
            ))}
          </select>

          {selectedModel && (
            <div>
              <label>Ano:</label>
              <select value={selectedYear} onChange={handleYearChange}>
                <option value="">Selecione o ano</option>
                {carYears.map(year => (
                  <option className="options" key={year.codigo} value={year.codigo}>
                    {year.nome}
                  </option>
                ))}
              </select>

              {selectedYear && (
                <div>
                  <h2>Resultado</h2>
                  
                  <h3>Valor:</h3> {carValue}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BuscaFIPE;
