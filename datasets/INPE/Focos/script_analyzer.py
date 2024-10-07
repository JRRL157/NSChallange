import pandas as pd
import sys

# Função para mapear o estado para sua latitude e longitude
def get_latitude(state):
    return location_data.get(state.upper(), [None, None])[0]

def get_longitude(state):
    return location_data.get(state.upper(), [None, None])[1]

def main():

    if len(sys.argv) < 2:
        print("Arquivo inválido!")
        sys.exit(1)

    csv_file:str = sys.argv[1]
    print(f"nome do arquivo = {csv_file}")

    df = pd.read_csv(csv_file)

    df['data_pas'] = pd.to_datetime(df['data_pas'], errors='coerce')

    if df['data_pas'].isnull().any():
        print("Erro de conversao!")

    df['ano'] = df['data_pas'].dt.year
    df['mes'] = df['data_pas'].dt.month
    df['dia'] = df['data_pas'].dt.day

    # Remove duplicatas, mantendo apenas o primeiro registro para cada combinação de dia, mês, ano e estado
    #df_clean = df.drop_duplicates(subset=['estado', 'ano', 'mes', 'dia'], keep='first')

    #Guardando em um arquivo csv
    df.to_csv('output.csv')

if __name__ == '__main__':
    main()