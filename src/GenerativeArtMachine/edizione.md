Due metodologie di creazione delle edizioni:

Edizione : la rarità dipende dalle edizioni, nel senso che
una edizione potrà possedere solo elementi con a stessa
rarità

Elemeto : la rarità dipende singolarmente da ogni elemento.

Dopo aver effettuato dei test ho notato che
• se il numero di elementi è lo stesso in ogni rarità e
vengono generate tutte le combinazioni, il valore: 'quante
edizioni hanno elemento' risulta essere sempre uguale.
All'incirca ogni elemento sara posseduto dal 1,5% delle edizioni

Nell'esempio del test ci sono 3 rarità:
•comune/elementi:5
•raro/elementi:3
•super-raro/element:2

e tre layers:
•Background
•Cerchio
•InnerCircle

combinando gli elementi solo se hanno la stessa rarità ci si
trova con questa quantità di combinazioni possibili:
•comune:125
•raro:27
•super-raro:8

---

totale = 160

mentre se si combinano tutti gli elementi mischiandoli fra
di loro si ottengono:

tutti: 512

---

totale = 512

se si portassero le funzioni che calcolano le possibilità
nella classe rarità, non ci sarebbe di bisogno di creare il
getter elementsByLayerByRarity. In ogni classe rarità
verrebbero mostrati solo gli elementi che appartengono a
quella rarità. Dicendo di creare tutte le edizioni
creerebbe tutte le combinazioni posibili.

////////////

possibili combinazioni rarità nei layer

0 0 0 ///
0 0 1
0 0 2

0 1 0
0 1 1
0 1 2

0 2 0
0 2 1
0 2 2

1 0 0
1 0 1
1 0 2

1 1 0
1 1 1 ///
1 1 2

1 2 0
1 2 1
1 2 2

2 0 0
2 0 1
2 0 2

2 1 0
2 1 1
2 1 2

2 2 0
2 2 1
2 2 2 ///