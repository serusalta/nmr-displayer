import { Molecule } from 'openchemlib/full';
import React, { useState, useEffect, useCallback } from 'react';
import { MF } from 'react-mf';
import { StructureEditor } from 'react-ocl/full';

import NMRDisplayer from '../../component/NMRDisplayer.jsx';

let answers = JSON.parse(localStorage.getItem('nmrium-exercises') || '{}');

async function loadData(file) {
  const response = await fetch(file);
  checkStatus(response);
  const data = await response.json();
  return data;
}

function checkStatus(response) {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
  }
  return response;
}

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  nmrContainer: {
    height: '100%',
  },

  bottomContainer: {
    display: 'flex',
  },
  bottomRightContainer: {
    width: '50%',
    display: 'flex',
    height: '80%',
    flexDirection: 'column',
  },
  MF: {
    height: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    border: '1px dashed gray',
  },
  resultContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },

  result: {
    width: '50%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
  },

  StructureEditor: {
    backgroundColor: 'white',
    flex: '1',
  },
};

export default function Exercise(props) {
  const [data, setData] = useState();
  const [resultFlag, setResultFlag] = useState(null);
  const { file, title, baseURL } = props;

  const checkAnswer = useCallback(
    (response) => {
      if (data.answer) {
        const MolResponse = Molecule.fromMolfile(response);
        const idCodeResponse = MolResponse.getIDCode();
        answers[data.answer.idCode] = idCodeResponse;
        localStorage.setItem('nmrium-exercises', JSON.stringify(answers));
        // console.log({ idCodeResponse, idCodeResult });
        if (data.answer.idCode === idCodeResponse) {
          // correct answer
          setResultFlag(true);
        } else {
          setResultFlag(false);
          // wrong answer
        }
      }
    },
    [data],
  );

  useEffect(() => {
    if (file) {
      loadData(file).then((d) => {
        const _d = JSON.parse(JSON.stringify(d).replace(/\.\/+?/g, baseURL));

        if (_d && _d.molecules && _d.molecules[0] && _d.molecules[0].molfile) {
          const molecule = Molecule.fromMolfile(_d.molecules[0].molfile);
          const idCode = molecule.getIDCode();
          let currentAnswer = answers[idCode];

          if (currentAnswer) {
            currentAnswer = Molecule.fromIDCode(currentAnswer).toMolfile();
          }
          _d.answer = {
            idCode,
            currentAnswer,
            mf: molecule.getMolecularFormula().formula,
          };
          setData(_d);
        }
      });
    } else {
      setData({});
    }
  }, [baseURL, file, props]);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 30,
      }}
    >
      <h5 className="title">
        Determine la estructura del compuesto desconocido a partir de su espectro de RMN
      </h5>
      <p className="name">{title}</p>
      <div style={styles.mainContainer}>
        <div style={styles.nmrContainer}>
          <NMRDisplayer
            data={data}
            preferences={{
              general: {
                disableMultipletAnalysis: true,
                hideSetSumFromMolecule: true,
              },
              panels: {
                hidePeaksPanel: true,
                hideInformationPanel: true,
                hideRangesPanel: true,
                hideStructuresPanel: true,
                hideFiltersPanel: true,
              },
            }}
          />
        </div>
        <div style={styles.bottomContainer}>
          <div style={styles.StructureEditor}>
            <StructureEditor
              svgMenu={true}
              fragment={false}
              onChange={checkAnswer}
              initialMolfile={data && data.answer && data.answer.currentAnswer}
            />
          </div>
          <div style={styles.bottomRightContainer}>
            <div style={styles.MF}>
              <MF
                style={{ color: 'navy', fontSize: 30 }}
                mf={data && data.answer && data.answer.mf}
              />
            </div>
            <div
              style={{
                ...styles.resultContainer,
              }}
            >
              <div
                style={{
                  ...styles.result,
                  backgroundColor:
                    resultFlag == null ? 'white' : resultFlag ? 'green' : 'red',
                  color: resultFlag == null ? 'black' : 'white',
                }}
              >
                {resultFlag == null ? (
                  <p>Resultado</p>
                ) : resultFlag === true ? (
                  <p>Molecula correcta!</p>
                ) : (
                  <p>Molecula incorrecta!!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
