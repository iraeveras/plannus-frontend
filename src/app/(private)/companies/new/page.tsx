"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface FpasOption {
    id: string;
    codigo: string;
  }
  
  interface InssOption {
    id: string;
    inssPatronal: number;
  }
  
  interface FgtsOption {
    id: string;
    fgtsAprendizPercentage: number;
    fgtsPercentage: number;
  }

export default function NewCompany() {
  const [formData, setFormData] = useState({
    legalName: '',
    tradeName: '',
    cnpj: '',
    fpasId: '',
    contribuicaoInssEmpresaId: '',
    fgtsId: '',
    recolhimentoPis: false,
    status: 'active',
  });
  const [fpasOptions, setFpasOptions] = useState<FpasOption[]>([]);
  const [inssOptions, setInssOptions] = useState<InssOption[]>([]);
  const [fgtsOptions, setFgtsOptions] = useState<FgtsOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Buscar dados para FPAS, INSS e FGTS
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const [fpasResponse, inssResponse, fgtsResponse] = await Promise.all([
                api.get<FpasOption[]>('/fpas'),
                api.get<InssOption[]>('/contribuicao-inss-empresa'),
                api.get<FgtsOption[]>('/fgts'),
            ]);
            setFpasOptions(fpasResponse.data);
            setInssOptions(inssResponse.data);
            setFgtsOptions(fgtsResponse.data);
        } catch (err) {
            console.error('Erro ao buscar opções:', err);
            setError('Erro ao carregar opções.');
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await api.post('/companies', formData);
      setSuccess(true);
      setFormData({
        legalName: '',
        tradeName: '',
        cnpj: '',
        fpasId: '',
        contribuicaoInssEmpresaId: '',
        fgtsId: '',
        recolhimentoPis: false,
        status: 'active',
      });
      router.push('/companies');
    } catch (err: any) {
      console.error('Erro ao enviar dados:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Erro ao cadastrar empresa');
    }
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6">Cadastrar Empresa</h1>
      {loading && <p className="text-blue-600">Carregando opções...</p>}
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        {/* Campos de Razão Social, Nome Fantasia e CNPJ */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Razão Social</label>
          <input
            type="text"
            name="legalName"
            value={formData.legalName}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded focus:outline-primary"
            required
          />
        </div>

        {/* FPAS */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">FPAS</label>
          <select
            name="fpasId"
            value={formData.fpasId}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded focus:outline-primary"
            required
          >
            <option value="">Selecione uma opção</option>
            {fpasOptions.map((option: any) => (
              <option key={option.id} value={option.id}>
                {option.codigo}
              </option>
            ))}
          </select>
        </div>

        {/* Contribuição INSS Empresa */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contribuição INSS Empresa</label>
          <select
            name="contribuicaoInssEmpresaId"
            value={formData.contribuicaoInssEmpresaId}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded focus:outline-primary"
            required
          >
            <option value="">Selecione uma opção</option>
            {inssOptions.map((option: any) => (
              <option key={option.id} value={option.id}>
                {option.inssPatronal}%
              </option>
            ))}
          </select>
        </div>

        {/* FGTS */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">FGTS</label>
          <select
            name="fgtsId"
            value={formData.fgtsId}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded focus:outline-primary"
            required
          >
            <option value="">Selecione uma opção</option>
            {fgtsOptions.map((option: any) => (
              <option key={option.id} value={option.id}>
                Aprendiz: {option.fgtsAprendizPercentage}% | Geral: {option.fgtsPercentage}%
              </option>
            ))}
          </select>
        </div>

        {/* Recolhimento PIS */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Recolhimento PIS</label>
          <input
            type="checkbox"
            name="recolhimentoPis"
            checked={formData.recolhimentoPis}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        {/* Feedback de erro ou sucesso */}
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">Cadastro efetuado com sucesso!</p>}
        
        {/* Botão de Submissão */}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Cadastrar
        </button>
      </form>
    </main>
  );
}
