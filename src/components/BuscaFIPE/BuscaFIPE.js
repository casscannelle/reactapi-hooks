import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useFipeAPI(endpoint, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get(`https://parallelum.com.br/fipe/api/v1/carros${endpoint}`)
      .then(response => setData(response.data))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, dependencies);

  return { data, loading, error };
}

function BuscaFIPE() {
  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carYears, setCarYears] = useState([]);
  const [carValue, setCarValue] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const { data: brandData, loading: brandLoading, error: brandError } = useFipeAPI('/marcas');
  const { data: modelData, loading: modelLoading, error: modelError } = useFipeAPI(`/marcas/${selectedBrand}/modelos`, [selectedBrand]);
  const { data: yearData, loading: yearLoading, error: yearError } = useFipeAPI(`/marcas/${selectedBrand}/modelos/${selectedModel}/anos`, [selectedBrand, selectedModel]);
  const { data: valueData, loading: valueLoading, error: valueError } = useFipeAPI(`/marcas/${selectedBrand}/modelos/${selectedModel}/anos/${selectedYear}`, [selectedBrand, selectedModel, selectedYear]);

  const handleBrandChange = (event) => {
    const newSelectedBrand = event.target.value;
    setSelectedBrand(newSelectedBrand);
    setSelectedModel('');
    setSelectedYear('');
    setCarValue('');
  };

  const handleModelChange = (event) => {
    const newSelectedModel = event.target.value;
    setSelectedModel(newSelectedModel);
    setSelectedYear('');
    setCarValue('');
  };

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
        <option value="">Selecione a marca</option>
        {brandData && brandData.map(brand => (
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
            {modelData && modelData.modelos.map(model => (
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
                {yearData && yearData.map(year => (
                  <option className="options" key={year.codigo} value={year.codigo}>
                    {year.nome}
                  </option>
                ))}
              </select>

              {selectedYear && (
                <div>
                  <h2>Resultado</h2>
                  
                  {valueLoading && <p>Loading...</p>}
                  {valueError && <p>Error: {valueError.message}</p>}
                  {valueData && (
                    <>
                      <h3>Valor:</h3>
                      {valueData.Valor}
                    </>
                  )}
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
