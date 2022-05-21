
/**
 * Folder structure types
 * EDITION
 * Ogni edizione è composta da elementi facenti parte
 * della stessa rarità.
 * Il dna manager conta quanti elementi sono presenti
 * per ogni livello, in base alla rarità.
 * 
  I   Classe
  II  └── Layers
  III   └── Rarità
  IV      └── Elementi
 *
 * La rarità è il III livello nella struttura
 * delle directories.
 * es :
 * ci sono 3 livelli
 * con 3 rarità:
 * •comune: contenente 5 elementi
 * •raro: contenente 2 elementi
 * •super_raro: contente 1 elemento
 * Il dna manager calcola tutte le combinazioni
 * possibili fancendo
 * n°elementiRarita1Livello1 = A = 5
 * n°elementiRarita1Livello2 = B = 5
 * n°elementiRarita1Livello3 = C = 5
 * possibilitàComuni = A x B x C = 125
 * n°elementiRarita2Livello1 = A = 2
 * n°elementiRarita2Livello2 = B = 2
 * n°elementiRarita2Livello3 = C = 2
 * possibilitàComuni = A x B x C = 8
 * n°elementiRarita1Livello1 = A = 1
 * n°elementiRarita1Livello2 = B = 1
 * n°elementiRarita1Livello3 = C = 1
 * possibilitàComuni = A x B x C = 1
 * totale = 125 + 8 + 1 = 134
 * 
 * ELEMENT
 * Il dna Manager calcola tutte le possibili combinazioni
 * di tutti gli elementi presenti
 * elementiRari = 5 + 2 + 1 = 8
 * ogni livello può avere 12 elementi
 * Layer1Elementi = A = 8
 * Layer2Elementi = B = 8
 * Layer3Elementi = C = 8
 * per calcolare le possibilità bisogna fare
 * A x B x C = 512 Possibilità
 * in queste possibilità tutti gli elementi compaiono
 * con la stessa probabilità. Anche gli elementi rari
 * compaiono nella stessa quantità ovvero ogni elemento
 * appare 8 volte.
 * Fra queste 512 combinazioni ce nè solo una che contiene
 * tutti e 3 elementi piu rari.
 * Se teniamo solo due livelli con elementi super rari
 * rimane un solo liver
 * 
 * Ogni edizione può essere composta da elementi di
 * rarità diversa.
 */