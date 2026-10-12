import type { PhotoCredit } from '../types.ts'

const bySa3 = 'https://creativecommons.org/licenses/by-sa/3.0'
const bySa4 = 'https://creativecommons.org/licenses/by-sa/4.0'
const gfdl = 'https://www.gnu.org/licenses/old-licenses/fdl-1.2.html'

export const photoCredits: PhotoCredit[] = [
  { file: '/images/animals/zebra.jpg', subject: 'Plains zebra', artist: 'Yathin S Krishnappa', license: 'CC BY-SA 3.0', licenseUrl: bySa3, source: 'https://commons.wikimedia.org/wiki/File:Equus_quagga_burchellii_-_Etosha,_2014.jpg' },
  { file: '/images/animals/brown-lemur.jpg', subject: 'Brown lemur', artist: 'Charles J. Sharp', license: 'CC BY-SA 4.0', licenseUrl: bySa4, source: 'https://commons.wikimedia.org/wiki/File:Common_brown_lemur_(Eulemur_fulvus)_male.jpg' },
  { file: '/images/animals/ring-tailed-lemur.jpg', subject: 'Ring-tailed lemur', artist: 'Charles J. Sharp', license: 'CC BY-SA 4.0', licenseUrl: bySa4, source: 'https://commons.wikimedia.org/wiki/File:Ring-tailed_lemur_(Lemur_catta).jpg' },
  { file: '/images/animals/small-clawed-otter.jpg', subject: 'Asian small-clawed otter', artist: 'fir0002 / flagstaffotos.com.au', license: 'GFDL 1.2', licenseUrl: gfdl, source: 'https://commons.wikimedia.org/wiki/File:Otter_-_melbourne_zoo.jpg' },
  { file: '/images/animals/collared-peccary.jpg', subject: 'Collared peccary', artist: 'Carlos Delgado', license: 'CC BY-SA 3.0', licenseUrl: bySa3, source: 'https://commons.wikimedia.org/wiki/File:Pecari_tajacu_-_02.jpg' },
  { file: '/images/animals/cotton-top-tamarin.jpg', subject: 'Cotton-top tamarin', artist: 'Chensiyuan', license: 'CC BY-SA 4.0', licenseUrl: bySa4, source: 'https://commons.wikimedia.org/wiki/File:1_cotton_top_tamarin.jpg' },
  { file: '/images/animals/red-deer.jpg', subject: 'Red deer', artist: 'Luc Viatour', license: 'CC BY-SA 3.0', licenseUrl: bySa3, source: 'https://commons.wikimedia.org/wiki/File:Cervus_elaphus_Luc_Viatour_6.jpg' },
  { file: '/images/animals/chital.jpg', subject: 'Chital', artist: 'Giles Laurent', license: 'CC BY-SA 4.0', licenseUrl: bySa4, source: 'https://commons.wikimedia.org/wiki/File:066_Chital_in_Ranthambore_National_Park_Photo_by_Giles_Laurent.jpg' },
  { file: '/images/animals/cape-hare.jpg', subject: 'Cape hare', artist: 'Haplochromis', license: 'CC BY-SA 3.0', licenseUrl: bySa3, source: 'https://commons.wikimedia.org/wiki/File:Lepus_capensis_(cropped).jpg' },
  { file: '/images/animals/hamadryas-baboon.jpg', subject: 'Hamadryas baboon', artist: 'Manuel González Olaechea y Franco', license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0', source: 'https://commons.wikimedia.org/wiki/File:Papio_hamadryas_pair.jpg' },
  { file: '/images/animals/red-necked-wallaby.jpg', subject: 'Red-necked wallaby', artist: 'JJ Harrison', license: 'CC BY-SA 3.0', licenseUrl: bySa3, source: 'https://commons.wikimedia.org/wiki/File:Macropus_rufogriseus_rufogriseus_Bruny.jpg' },
  { file: '/images/animals/coati.jpg', subject: 'South American coati', artist: 'Rufus46', license: 'CC BY-SA 3.0', licenseUrl: bySa3, source: 'https://commons.wikimedia.org/wiki/File:Nasenbaer_Nasua_nasua_Zoo_Augsburg-04.jpg' },
  { file: '/images/animals/polecat.jpg', subject: 'European polecat', artist: 'Charles J. Sharp', license: 'CC BY-SA 4.0', licenseUrl: bySa4, source: 'https://commons.wikimedia.org/wiki/File:European_polecat_(Mustela_putorius)_Drenthe.jpg' },
  { file: '/images/animals/jungle-cat.jpg', subject: 'Jungle cat', artist: 'L. Shyamal', license: 'CC BY-SA 3.0', licenseUrl: bySa3, source: 'https://commons.wikimedia.org/wiki/File:FelisChausMunsiari1.jpg' },
  { file: '/images/animals/nubian-ibex.jpg', subject: 'Nubian ibex', artist: 'Netzach Farbiash', license: 'CC BY 2.5', licenseUrl: 'https://creativecommons.org/licenses/by/2.5', source: 'https://commons.wikimedia.org/wiki/File:PikiWiki_Israel_38769_Male_Ibex.jpg' },
  { file: '/images/animals/pig-tailed-macaque.jpg', subject: 'Southern pig-tailed macaque', artist: 'Shreeram M.V.', license: 'CC BY-SA 4.0', licenseUrl: bySa4, source: 'https://commons.wikimedia.org/wiki/File:Southern_Pig-tailed_Macaque_-_Shreeram_MV.jpg' },
  { file: '/images/animals/burmese-python.jpg', subject: 'Burmese python', artist: 'Tigerpython', license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0', source: 'https://commons.wikimedia.org/wiki/File:Brooding_female_Python_molurus_bivittatus.jpg' },
  { file: '/images/animals/mountain-gazelle.jpg', subject: 'Mountain gazelle', artist: 'Bassem18', license: 'CC BY-SA 3.0', licenseUrl: bySa3, source: 'https://commons.wikimedia.org/wiki/File:Gazella_gazella.jpg' },
  { file: '/images/animals/colobus.jpg', subject: 'Mantled guereza', artist: 'Tuxyso', license: 'CC BY-SA 3.0', licenseUrl: bySa3, source: 'https://commons.wikimedia.org/wiki/File:Mantelaffe-mit-Baby-Zoo-Muenster.jpg' },
  { file: '/images/animals/spider-monkey.jpg', subject: 'Spider monkey', artist: 'Miguelrangeljr', license: 'CC BY-SA 3.0', licenseUrl: bySa3, source: 'https://commons.wikimedia.org/wiki/File:A._paniscus_Zoo_SP.jpg' },
  { file: '/images/animals/red-kangaroo.jpg', subject: 'Red kangaroo', artist: 'fir0002 / flagstaffotos.com.au', license: 'GFDL 1.2', licenseUrl: gfdl, source: 'https://commons.wikimedia.org/wiki/File:Red_kangaroo_-_melbourne_zoo.jpg' },
  { file: '/images/animals/scimitar-oryx.jpg', subject: 'Scimitar-horned oryx', artist: 'Faouz Kilani', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0', source: 'https://commons.wikimedia.org/wiki/File:Scimitar-Horned_Oryx_(Oryx_dammah).jpg' },
  { file: '/images/animals/blanfords-fox.jpg', subject: "Blanford's fox", artist: 'Eyal Bartov', license: 'CC BY-SA 3.0', licenseUrl: bySa3, source: 'https://commons.wikimedia.org/wiki/File:Blandford%27s_fox_1.jpg' },
  { file: '/images/animals/chinchilla.jpg', subject: 'Long-tailed chinchilla', artist: 'Nicolas Guérin', license: 'CC BY-SA 3.0', licenseUrl: bySa3, source: 'https://commons.wikimedia.org/wiki/File:Chinchilla_lanigera_(Wroclaw_zoo)-2.JPG' },
  { file: '/images/animals/rock-hyrax.jpg', subject: 'Rock hyrax', artist: 'Naturedata', license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/', source: 'https://commons.wikimedia.org/wiki/File:Rock_hyrax_Serengeti_National_Park.jpg' },
  { file: '/images/animals/guinea-pig.jpg', subject: 'Guinea pig', artist: 'Plath81', license: 'CC BY-SA 3.0', licenseUrl: bySa3, source: 'https://commons.wikimedia.org/wiki/File:George_the_amazing_guinea_pig.jpg' },
]
