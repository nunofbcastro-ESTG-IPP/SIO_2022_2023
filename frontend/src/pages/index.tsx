import { useQuery } from '@tanstack/react-query';
import { DateRangePicker, Grid, Text, Title } from '@tremor/react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import AreaChartView from '../components/AreaChartView';
import KpiCards from '../components/KpiCard';
import LineChartView from '../components/LineChartView';
import PieChartView from '../components/PieChartView';
import TableView from '../components/TableView';
import { useDashboard } from '../context/DashboardContext';
import { MyAPI } from '../services/MyAPI';
import BarChartView from '@/components/BarChartView';
import {
  getBestClients,
  getBestSuppliers,
  getCostsAndSales,
  getLastSales,
  getMetrics,
  getMetricsSupplier,
  getMostSoldProducts,
} from '@/services/api/MyAPI';
import BestClientsChartView from '@/components/BestClientsChartView';
import BestSuppliersChartView from '@/components/BestSuppliersChartView';
import Head from 'next/head';

interface HomeProps {
  products: any[];
  costsAndSales: any[];
  metrics: any;
  tableData: any[];
  metricsSupplier: any[];
}

export default function Home({
  products,
  costsAndSales,
  metrics,
  tableData,
  metricsSupplier,
}: HomeProps) {
  const { currentDateRange, setCurrentDateRange } = useDashboard();

  const { data: dataProducts, refetch: refetchProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Array<any>> => {
      const { data } = await getMostSoldProducts(
        currentDateRange[0]?.toISOString(),
        currentDateRange[1]?.toISOString()
      );
      return data;
    },
    initialData: products,
  });

  const { data: dataCostsAndSales, refetch: refetchCostAndSales } = useQuery({
    queryKey: ['costsAndSales'],
    queryFn: async (): Promise<Array<any>> => {
      const { data } = await getCostsAndSales(
        currentDateRange[0]?.toISOString(),
        currentDateRange[1]?.toISOString()
      );
      return data;
    },
    initialData: costsAndSales,
  });

  const { data: dataMetrics, refetch: refetchMetrics } = useQuery({
    queryKey: ['metrics'],
    queryFn: async (): Promise<Array<any>> => {
      const { data } = await getMetrics(
        currentDateRange[0]?.toISOString(),
        currentDateRange[1]?.toISOString()
      );
      return data;
    },
    initialData: metrics,
  });

  const { data: dataLastSales, refetch: refetchLastSales } = useQuery({
    queryKey: ['tableData'],
    queryFn: async (): Promise<Array<any>> => {
      const { data } = await getLastSales(
        currentDateRange[0]?.toISOString(),
        currentDateRange[1]?.toISOString()
      );
      return data;
    },
    initialData: tableData,
  });

  const { data: dataMetricsSuppliers, refetch: refetchMetricsSuppliers } =
    useQuery({
      queryKey: ['metricsSupplier'],
      queryFn: async (): Promise<Array<any>> => {
        const { data } = await getMetricsSupplier(
          currentDateRange[0]?.toISOString(),
          currentDateRange[1]?.toISOString()
        );
        return data;
      },
      initialData: metricsSupplier,
    });

  const { data: dataBestClients, refetch: refetchBestClients } = useQuery({
    queryKey: ['metricsBestClients'],
    queryFn: async (): Promise<Array<any>> => {
      const { data } = await getBestClients(
        currentDateRange[0]?.toISOString(),
        currentDateRange[1]?.toISOString()
      );
      return data;
    },
    initialData: metricsSupplier,
  });

  const { data: dataBestSuppliers, refetch: refetchBestSuppliers } = useQuery({
    queryKey: ['metricsBestSuppliers'],
    queryFn: async (): Promise<Array<any>> => {
      const { data } = await getBestSuppliers(
        currentDateRange[0]?.toISOString(),
        currentDateRange[1]?.toISOString()
      );
      return data;
    },
    initialData: metricsSupplier,
  });

  useEffect(() => {
    refetchProducts();
    refetchCostAndSales();
    refetchLastSales();
    refetchMetrics();
    refetchMetricsSuppliers();
    refetchBestClients();
    refetchBestSuppliers();
  }, [
    currentDateRange,
    refetchProducts,
    refetchCostAndSales,
    refetchLastSales,
    refetchMetrics,
    refetchMetricsSuppliers,
    refetchBestClients,
    refetchBestSuppliers,
  ]);

  return (
    <>
      <Head>
        <title>Dashboard - TechHub</title>
      </Head>
      <main className="flex-1 flex flex-col p-10">
        <div className="flex justify-between">
          <div>
            <Title>Dashboard</Title>
          </div>

          <div>
            <DateRangePicker
              className="max-w-md mx-auto"
              value={currentDateRange}
              onValueChange={setCurrentDateRange}
              dropdownPlaceholder="Select"
            />
          </div>
        </div>

        <Grid numColsMd={3} numColsLg={4} className="gap-6 mt-6">
          {dataMetrics && <KpiCards metrics={dataMetrics} />}
        </Grid>

        <Grid numColsMd={1} numColsLg={2} className="gap-6 mt-6">
          {dataCostsAndSales && (
            <LineChartView cost_sales_gross_month={dataCostsAndSales} />
          )}
          {dataCostsAndSales && (
            <AreaChartView costsAndSales={dataCostsAndSales} />
          )}
          {dataProducts && <PieChartView products={dataProducts} />}
          {dataMetricsSuppliers && (
            <BarChartView metrics={dataMetricsSuppliers} />
          )}
          {dataBestClients && (
            <BestClientsChartView clients={dataBestClients} />
          )}
          {dataBestSuppliers && (
            <BestSuppliersChartView suppliers={dataBestSuppliers} />
          )}
        </Grid>

        <div className="mt-6">
          {dataLastSales && <TableView tableData={dataLastSales} />}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data: dataProducts } = await getMostSoldProducts();

    const { data: dataCostsAndSales } = await getCostsAndSales();

    const { data: metrics } = await getMetrics();

    const { data: tableData } = await getLastSales();

    const { data: metricsSupplier } = await getMetricsSupplier();

    const { data: bestClients } = await getLastSales();

    const { data: bestSuppliers } = await getMetricsSupplier();

    return {
      props: {
        products: dataProducts,
        costsAndSales: dataCostsAndSales,
        metrics: metrics,
        tableData: tableData,
        metricsSupplier: metricsSupplier,
        bestClients: bestClients,
        bestSuppliers: bestSuppliers,
      },
    };
  } catch (err) {
    return {
      props: {
        products: [{}],
        costsAndSales: [{}],
        metrics: [{}],
        tableData: [{}],
        metricsSupplier: [{}],
        bestClients: [{}],
        bestSuppliers: [{}],
      },
    };
  }
};
