//var arCurrentStockNames = null;
var myVar;
var sWait = "";
var empty;

var arFunctionNames = ["minVarPortf", "portfolio", "minVarWeights", "tableOfC", "tableOfO", "tableOfH", "tableOfL", "tableOfV", "normTableOfC", "normTableOfO", "normTableOfH", "normTableOfL"];//, "pnlPairBB"
//var sStartDateG = '2016-05-22';
var bBusy = false;
//var nWaiting = 0;
//var nSecondsToWait=10;
var nGlobalShift = 0;

var arAvailableStiocks = null;//[[name],[arDate],[arOpen],ar[High],[arLow],[arClose],[arVolume]]
var arAvailableStiocksDaily = null;
var arAvailableStiocksCanned = null;
var arStock = null;// current stock
var arBothSymbolList = null;
var nTestedFromBothSymbolList = 0;
//var nPushedSymbols = 0;
//var arDates = null;///??????????
var arFromSymbolListToAvailableIndex = null;
var arFromParallelListToAvailableIndex = null;

var arNyseSymbols = ['DJIA', 'DDD', 'MMM', 'WBAI', 'WUBA', 'AHC', 'ATEN', 'AAC', 'AIR', 'AAN', 'ABB', 'ABT', 'ABBV', 'ANF', 'GCH', 'JEQ', 'SGF', 'ABM', 'AKR', 'ACN', 'ACCO', 'ACW', 'ATV', 'ATU', 'AYI', 'ADX', 'PEO', 'AGRO', 'ADPT', 'AAP', 'ADSW', 'WMS', 'ASX', 'APFH', 'ASIX', 'AAV', 'AVK', 'AGC', 'LCM', 'ACM', 'ANW', 'AEB', 'AED', 'AEG', 'AEH', 'AEK', 'AER', 'HIVE', 'AJRD', 'AET', 'AMG', 'MGR', 'AFL', 'AFSD', 'MITT', 'MITT^A', 'MITT^B', 'AGCO', 'A', 'AEM', 'ADC', 'GRO', 'AGU', 'AL', 'APD', 'AYR', 'AKS', 'ALP^O', 'ALG', 'AGI', 'ALK', 'AIN', 'ALB', 'AA', 'AA^B', 'ALR', 'ALR^B', 'ALEX', 'ALX', 'ARE', 'ARE^D', 'ARE^E', 'BABA', 'Y', 'ATI', 'ALLE', 'AGN', 'AGN^A', 'ALE', 'AKP', 'ADS', 'AFB', 'AOI', 'AWF', 'AB', 'LNT', 'NCV', 'NCZ', 'ACV', 'NIE', 'NFJ', 'AWH', 'ALSN', 'ALL', 'ALL^A', 'ALL^B', 'ALL^C', 'ALL^D', 'ALL^E', 'ALL^F', 'ALLY', 'ALLY^A', 'ALJ', 'ALDW', 'AGD', 'AWP', 'AOD', 'RESI', 'MO', 'ACH', 'AMBR', 'ABEV', 'AMC', 'AMFW', 'AEE', 'AMRC', 'AMX', 'AAT', 'AXL', 'ACC', 'AEO', 'AEP', 'AEL', 'AXP', 'AFA', 'AFG', 'AFGE', 'AFGH', 'AFW', 'AMH', 'AMH^A', 'AMH^B', 'AMH^C', 'AMH^D', 'AMH^E', 'AIG', 'AIG.WS', 'AMID', 'ARL', 'ARA', 'AWR', 'AMT', 'AMT^A', 'AMT^B', 'AVD', 'AWK', 'APU', 'AMP', 'ABC', 'ANFI', 'AHS', 'AP', 'APH', 'BETR', 'AXR', 'AME', 'AFSI^A', 'AFSI^B', 'AFSI^C', 'AFSI^D', 'AFSI^E', 'AFSI^F', 'AFSS', 'AFST', 'AEUA', 'APC', 'AU', 'BUD', 'AXE', 'NLY', 'NLY^A', 'NLY^C', 'NLY^D', 'NLY^E', 'AM', 'AR', 'ANTM', 'ANTX', 'ANH', 'ANH^A', 'ANH^B', 'ANH^C', 'AON', 'APA', 'AIV', 'AIV^A', 'ARI', 'ARI^A', 'ARI^C', 'APO', 'AIB', 'AIY', 'AFT', 'AIF', 'APLE', 'AIT', 'ATR', 'WTR', 'WAAS', 'ARMK', 'ABR', 'ABR^A', 'ABR^B', 'ABR^C', 'ABRN', 'ARC', 'ARCX', 'MT', 'ARH^C', 'ARCH', 'ADM', 'AROC', 'ARCO', 'ASC', 'AFC', 'ARU', 'ACRE', 'ARDC', 'ARES', 'ARES^A', 'AGX', 'ANET', 'AI', 'AIC', 'AIW', 'AHH', 'ARR', 'ARR^A', 'ARR^B', 'AFI', 'AWI', 'ARW', 'AJG', 'APAM', 'ASA', 'ABG', 'AHP', 'AHP^B', 'AHT', 'AHT^A', 'AHT^D', 'AHT^F', 'ASH', 'APB', 'GRR', 'ASPN', 'AHL', 'AHL^A', 'AHL^B', 'AHL^C', 'AHL^D', 'ASB', 'ASB^C', 'ASB^D', 'AC', 'AIZ', 'AGO', 'AGO^B', 'AGO^E', 'AGO^F', 'AF', 'AF^C', 'AZN', 'HOME', 'T', 'ATTO', 'ATKR', 'AT', 'ATO', 'ATW', 'AUO', 'ATHM', 'ALV', 'AN', 'AZO', 'AVB', 'AGR', 'ACP', 'AVY', 'AVG', 'AVH', 'AVA', 'AV', 'AVV', 'AVT', 'AVP', 'AVX', 'AXTA', 'AXS', 'AXS^C', 'AXS^D', 'AXON', 'AZRE', 'AZZ', 'BGS', 'BW', 'BGH', 'BMI', 'BHI', 'BBN', 'BLL', 'BGE^B', 'BANC', 'BANC^C', 'BANC^D', 'BANC^E', 'BBVA', 'BBD', 'BBDO', 'BCH', 'BLX', 'BSBR', 'BSAC', 'SAN', 'SAN^A', 'SAN^B', 'SAN^C', 'SAN^I', 'CIB', 'BXS', 'BAC', 'BAC.WS.A', 'BAC.WS.B', 'BAC^A', 'BAC^C', 'BAC^D', 'BAC^E', 'BAC^I', 'BAC^L', 'BAC^W', 'BAC^Y', 'BML^G', 'BML^H', 'BML^I', 'BML^J', 'BML^L', 'BOH', 'BMO', 'NTB', 'BK', 'BK^C', 'BNS', 'RATE', 'BKU', 'BCS', 'BCS^A', 'BCS^D', 'MCI', 'MPV', 'BNED', 'BKS', 'B', 'CUDA', 'ABX', 'BAS', 'BAX', 'BTE', 'BBT', 'BBT^D', 'BBT^E', 'BBT^F', 'BBT^G', 'BBT^H', 'BFR', 'BBX', 'BCE', 'BZH', 'BDX', 'BDC', 'BDC^B', 'BXE', 'BEL', 'BMS', 'BHE', 'BRK.A', 'BRK.B', 'BHLB', 'BBY', 'BGCA', 'BHP', 'BBL', 'BIG', 'BH', 'BBG', 'BIOA', 'BIOA.WS', 'BIO', 'BIO.B', 'BITA', 'BKH', 'BKHU', 'BKFS', 'BSM', 'BJZ', 'BFZ', 'CII', 'BHK', 'HYT', 'BTZ', 'DSU', 'BHL', 'BGR', 'BDJ', 'EGF', 'FRA', 'BFO', 'BGT', 'BOE', 'BME', 'BAF', 'BKT', 'BGY', 'BKN', 'BTA', 'BIT', 'MUI', 'MNE', 'MUA', 'BPK', 'BKK', 'BBK', 'BBF', 'BYM', 'BFK', 'BTT', 'MEN', 'MUC', 'MUH', 'MHD', 'MFL', 'MUJ', 'MHN', 'MUE', 'MUS', 'MVT', 'MYC', 'MCA', 'MYD', 'MYF', 'MFT', 'MIY', 'MYJ', 'MYN', 'MPA', 'MQT', 'MYI', 'MQY', 'BNJ', 'BNY', 'BLH', 'BQH', 'BSE', 'BCX', 'BST', 'BSD', 'BUI', 'BLK', 'BGB', 'BGX', 'BSL', 'BCRH', 'BXC', 'BWP', 'BA', 'BCC', 'BCEI', 'BOOT', 'BAH', 'BWA', 'SAM', 'BXP', 'BXP^B', 'BSX', 'BOX', 'BYD', 'BP', 'BPT', 'BERY', 'BRC', 'BDN^E', 'BDN', 'LND', 'BAK', 'BRFS', 'BPI', 'BGG', 'BFAM', 'EAT', 'BCO', 'BMY', 'BRS', 'BRX', 'BR', 'BKD', 'BAM', 'BBU', 'BOXC', 'DTLA^', 'INF', 'HHY', 'BIP', 'BOI', 'BPY', 'BEP', 'HTR', 'BRO', 'BF.A', 'BF.B', 'BRT', 'BC', 'BT', 'BPL', 'BKE', 'BVN', 'BBW', 'BG', 'BURL', 'BWXT', 'BCR', 'GYB', 'PFH', 'CAB', 'CABO', 'CBT', 'COG', 'CACI', 'CAE', 'CAI', 'CAA', 'CAL', 'CCC', 'CRC', 'CWT', 'CALX', 'ELY', 'CPE', 'CPE^A', 'CPN', 'CBM', 'CPT', 'CCJ', 'CPB', 'CWH', 'CM', 'CNI', 'CNQ', 'CP', 'CAJ', 'CMN', 'COF', 'COF.WS', 'COF^C', 'COF^D', 'COF^F', 'COF^G', 'COF^P', 'CSU', 'BXMT', 'CLA', 'CMO', 'CMO^E', 'CRR', 'CAH', 'CCP', 'CRCM', 'CSL', 'KMX', 'CCL', 'CUK', 'CRS', 'CSV', 'CRI', 'CAS', 'CSLT', 'CTLT', 'CTT', 'CAT', 'CATO', 'CBZ', 'CBL', 'CBL^D', 'CBL^E', 'CBO', 'IGR', 'CBG', 'CBS', 'CBS.A', 'CBX', 'CDI', 'CEB', 'FUN', 'CDR', 'CDR^B', 'CGI', 'CE', 'CLS', 'CEL', 'CPAC', 'CX', 'CNCO', 'CVE', 'CNC', 'CEN', 'CNP', 'EBR', 'EBR.B', 'CEE', 'CCS', 'CTL', 'CVO', 'CF', 'CGG', 'GIB', 'ECOM', 'CRL', 'CLDT', 'CMCM', 'CHGG', 'CHE', 'CC', 'CHMT', 'CHMI', 'CHK', 'CHK^D', 'CHKR', 'CHSP', 'CHSP^A', 'CPK', 'CVX', 'CBI', 'CHS', 'CIM', 'CO', 'STV', 'DL', 'CEA', 'CHN', 'CGA', 'LFC', 'CHL', 'BORN', 'COE', 'SNP', 'ZNH', 'CHA', 'CHU', 'XNY', 'CYD', 'ZX', 'CMG', 'CHH', 'CBK', 'CHT', 'CHD', 'CBR', 'CIEN', 'CI', 'XEC', 'CBB', 'CBB^B', 'CNK', 'CINR', 'CIR', 'CIT', 'BLW', 'C', 'C.WS.A', 'C^C', 'C^J', 'C^K', 'C^L', 'C^N', 'C^P', 'C^S', 'CFG', 'CIA', 'CIO', 'CIO^A', 'CVEO', 'CIVI', 'CLC', 'CWEI', 'CLH', 'CCO', 'CBA', 'CEM', 'EMO', 'CTR', 'CLW', 'CLF', 'CLX', 'CLD', 'MYCC', 'CMS', 'CMS^B', 'CNA', 'CNHI', 'CNO', 'CEO', 'CNXC', 'COH', 'CIE', 'KOF', 'KO', 'CCE', 'CDE', 'FOF', 'INB', 'CNS', 'UTF', 'LDP', 'MIE', 'RQI', 'RNP', 'PSF', 'RFI', 'CFX', 'CL', 'CXE', 'CIF', 'CXH', 'CMU', 'CLNY', 'CLNY^A', 'CLNY^B', 'CLNY^C', 'SFR', 'CPPL', 'CXP', 'STK', 'CCV', 'CCZ', 'CMA', 'CMA.WS', 'FIX', 'CMC', 'CBU', 'CYH', 'CHCT', 'CIG', 'CIG.C', 'CBD', 'SBS', 'ELP', 'CCU', 'CODI', 'CMP', 'CSC', 'CRK', 'CAG', 'CXO', 'CCM', 'CNNX', 'COP', 'CNX', 'ED', 'STZ', 'STZ.B', 'CSTM', 'TCS', 'CBPX', 'CLR', 'VLRS', 'CVG', 'COO', 'CTB', 'CPS', 'CPA', 'CLB', 'CLGX', 'CORR', 'CORR^A', 'COR', 'COR^A', 'GLW', 'GYC', 'OFC', 'OFC^L', 'CXW', 'CZZ', 'CMRE', 'CMRE^B', 'CMRE^C', 'CMRE^D', 'COTV', 'COT', 'COTY', 'CFC^B', 'CUZ', 'CVA', 'CPF', 'CPL', 'CR', 'CRD.A', 'CRD.B', 'BAP', 'CS', 'CPG', 'CEQP', 'CRH', 'CRT', 'CAPL', 'CCI', 'CCI^A', 'CCK', 'CRY', 'CSRA', 'CSS', 'CST', 'CTS', 'CUBE', 'CUBE^A', 'CUB', 'CFR', 'CFR^A', 'CFI', 'CMI', 'CW', 'SRF', 'SZC', 'CUBI', 'CUBI^C', 'CUBI^D', 'CUBI^E', 'CUBI^F', 'CUBS', 'CSI', 'CVT', 'CVI', 'UAN', 'CVRR', 'CVS', 'CELP', 'CYS', 'CYS^A', 'CYS^B', 'DHI', 'CB', 'DAN', 'DHR', 'DAC', 'DQ', 'DRI', 'DAR', 'DVA', 'DPM', 'DCT', 'DDR', 'DDR^J', 'DDR^K', 'DF', 'DECK', 'DE', 'DEX', 'DDF', 'DKL', 'DK', 'DVMT', 'DLPH', 'DAL', 'DEL', 'DLX', 'DMD', 'DNR', 'DKT', 'DB', 'DTK', 'DXB', 'DVN', 'DV', 'DHX', 'DHT', 'DEO', 'DO', 'DRH', 'DSX', 'DSX^B', 'DSXN', 'DKS', 'DBD', 'DLR', 'DLR^F', 'DLR^G', 'DLR^H', 'DLR^I', 'DGI', 'DDS', 'DDT', 'DIN', 'DPLO', 'DFS', 'DFS^B', 'DRA', 'DNI', 'DLB', 'DG', 'DDC', 'DM', 'D', 'DCUC', 'DCUD', 'DRUA', 'DPZ', 'UFS', 'DCI', 'DFIN', 'LPG', 'DSL', 'DBL', 'PLOW', 'DEI', 'DOV', 'DDE', 'DVD', 'DOW', 'DPS', 'RDY', 'DRD', 'DW', 'DHF', 'DMB', 'DSM', 'LEO', 'DRQ', 'DST', 'DSW', 'DTE', 'DTJ', 'DTQ', 'DTV', 'DTZ', 'DCO', 'DPG', 'DSE', 'DNP', 'DTF', 'DUC', 'DUK', 'DUKH', 'DRE', 'DNB', 'DFT', 'DFT^C', 'DHG', 'DY', 'DLNG', 'DLNG^A', 'DYN', 'DYN.WS', 'DYN^A', 'DYNC', 'DX', 'DX^A', 'DX^B', 'DD', 'DD^A', 'DD^B', 'ELF', 'SSP', 'EGIF', 'EXP', 'ECC', 'ECCA', 'ECCB', 'ECCZ', 'DEA', 'EGP', 'EMN', 'KODK', 'KODK.WS', 'KODK.WS.A', 'ETN', 'ETV', 'ETW', 'EV', 'EOI', 'EOS', 'EFT', 'EFF', 'EHT', 'ETX', 'EOT', 'EVN', 'ETJ', 'EFR', 'EVF', 'EVG', 'EVT', 'ETO', 'EXD', 'ETG', 'ETB', 'ETY', 'EXG', 'ECT', 'ECR', 'ECL', 'EC', 'EIX', 'EDR', 'EW', 'EHIC', 'EP^C', 'EE', 'EGO', 'LLY', 'ELLI', 'EFC', 'EARN', 'AKO.A', 'AKO.B', 'ERJ', 'EME', 'EMES', 'EBS', 'EMG', 'EMR', 'EDE', 'ESRT', 'EIG', 'EDN', 'EOCC', 'ENBL', 'EEQ', 'EEP', 'ENB', 'ECA', 'EXK', 'EOCA', 'GI', 'ENH', 'ENH^C', 'NDRO', 'EGN', 'ENR', 'EPC', 'ETE', 'ETP', 'ERF', 'ENIA', 'ENIC', 'ENS', 'EGL', 'E', 'ENLK', 'ENLC', 'EBF', 'ENVA', 'NPO', 'ESV', 'ETM', 'EAB', 'EAE', 'EAI', 'ETR', 'ELC', 'ELJ', 'ELU', 'EFM.CL', 'EMP', 'EMZ.CL', 'ENJ', 'ENO', 'EZT', 'EPD', 'EVC', 'ENV', 'EVHC', 'EVA', 'ENZ', 'EOG', 'EPE', 'EPAM', 'EPR', 'EPR^C', 'EPR^E', 'EPR^F', 'EQT', 'EQGP', 'EQM', 'EFX', 'EQC', 'EQC^D', 'EQCO', 'ELS', 'ELS^C', 'EQY', 'EQR', 'EQS', 'ERA', 'EROS', 'ESE', 'ESNT', 'ESS', 'EL', 'ESL', 'ETH', 'EURN', 'EEA', 'EVER', 'EVER^A', 'EVR', 'RE', 'EVRI', 'ES', 'EVTC', 'EVDY', 'EVGN', 'EVH', 'EXAR', 'XCO', 'EXC', 'EXCU', 'EXPR', 'STAY', 'EXTN', 'EXR', 'XOM', 'FNB', 'FNB^E', 'FN', 'FDS', 'FICO', 'FMSA', 'SFUN', 'FPI', 'FBK', 'FFG', 'FCB', 'AGM', 'AGM.A', 'AGM^A', 'AGM^B', 'AGM^C', 'FRT', 'FSS', 'FII', 'FPT', 'FMN', 'FDX', 'FCH', 'FCH^A', 'RACE', 'FGP', 'FOE', 'FCAM', 'FCAU', 'FBR', 'FGL', 'FNF', 'FNFV', 'FIS', 'FMO', 'FSCE', 'FAC', 'FAF', 'FBP', 'FCFS', 'FCF', 'FDC', 'FHN', 'FHN^A', 'FR', 'AG', 'FPO', 'FRC', 'FRC^A', 'FRC^B', 'FRC^C', 'FRC^D', 'FRC^E', 'FRC^F', 'FRC^G', 'FFA', 'FMY', 'FAV', 'FDEU', 'FIF', 'FSD', 'FPF', 'FEI', 'FPL', 'FCT', 'FGB', 'FHY', 'FEO', 'FAM', 'FE', 'FIT', 'OAKS', 'OAKS^A', 'FBC', 'DFP', 'PFD', 'PFO', 'FFC', 'FLC', 'FLT', 'FLTX', 'FTK', 'FLO', 'FLS', 'FLR', 'FLY', 'FMC', 'FTI', 'FMX', 'FL', 'F', 'FELP', 'FCE.A', 'FCE.B', 'FOR', 'FTV', 'FIG', 'FTAI', 'FSM', 'FBHS', 'FET', 'FCPT', 'FNV', 'FC', 'FSB', 'BEN', 'FT', 'FI', 'FCX', 'FMS', 'FDP', 'FRO', 'FSIC', 'FCN', 'FF', 'GCV', 'GCV^B', 'GDV', 'GDV^A', 'GDV^D', 'GDV^G', 'GAB', 'GAB^D', 'GAB^G', 'GAB^H', 'GAB^J', 'GGZ', 'GGZ^A', 'GGT', 'GGT^B', 'GUT', 'GUT^A', 'GUT^C', 'GFA', 'GCAP', 'GBL', 'GNT', 'GME', 'GPS', 'IT', 'GLOG', 'GLOG^A', 'GLOP', 'GATX', 'GMTA', 'GZT', 'GCP', 'GNK', 'GNRT', 'GNRC', 'GAM', 'GAM^B', 'BGC', 'GD', 'GEH', 'GEK', 'GE', 'GEB', 'GGP', 'GGP^A', 'GIS', 'GM', 'GM.WS.B', 'GCO', 'GWR', 'GEL', 'GEN', 'GNE', 'GNE^A', 'G', 'GPC', 'GNW', 'GEO', 'GPRK', 'GPE^A', 'GGB', 'GTY', 'GIMO', 'GIL', 'GLT', 'GKOS', 'GSK', 'BRSS', 'GMRE', 'GNL', 'GLP', 'GPN', 'GSL', 'GSL^B', 'GLOB', 'GMED', 'GMS', 'GNC', 'GDDY', 'GOL', 'GFI', 'GG', 'GSBD', 'GS', 'GS^A', 'GS^B', 'GS^C', 'GS^D', 'GS^I', 'GS^J', 'GS^K', 'GS^N', 'GSJ', 'GER', 'GMZ', 'GPX', 'GGG', 'GHM', 'GHC', 'GPT', 'GPT^A', 'GRAM', 'GVA', 'GRP.U', 'GPK', 'GTN', 'GTN.A', 'AJX', 'GXP', 'GWB', 'GDOT', 'GBX', 'GHL', 'GEF', 'GEF.B', 'GFF', 'GPI', 'GRUB', 'PAC', 'ASR', 'AVAL', 'BSMX', 'SUPV', 'TV', 'GTT', 'GSH', 'GES', 'GGM', 'GPM', 'GGE', 'GEQ', 'GOF', 'GBAB', 'GWRE', 'GLF', 'HRB', 'FUL', 'HAE', 'HK', 'HK.WS', 'HAL', 'HYH', 'HBI', 'HASI', 'HOG', 'HAR', 'HMY', 'HRS', 'HSC', 'HHS', 'HGH', 'HIG', 'HIG.WS', 'HNR', 'HVT', 'HVT.A', 'HE', 'HE^U', 'HCA', 'HCI', 'HCJ', 'HCP', 'HDB', 'HW', 'HR', 'HTA', 'HLS', 'HLS.WS', 'HL', 'HL^B', 'HEI', 'HEI.A', 'HLX', 'HP', 'HLF', 'HRI', 'HTGC', 'HTGX', 'HTGY', 'HTGZ', 'HRTG', 'HT', 'HT^C', 'HT^D', 'HSY', 'HTZ', 'HES', 'HES^A', 'HPE', 'HXL', 'HF', 'HGG', 'HCLP', 'NHF', 'HIW', 'HIL', 'HI', 'HRC', 'HTH', 'HLT', 'HNI', 'HMLP', 'HEP', 'HFC', 'HD', 'HMC', 'HON', 'HMN', 'HZN', 'HTF', 'HRL', 'HOS', 'HST', 'HLI', 'HOV', 'HHC', 'HPQ', 'HRG', 'HSBC', 'HSBC^A', 'HSEA', 'HSEB', 'HNP', 'HUBB', 'HUBS', 'HBM', 'HBM.WS', 'HPP', 'HGT', 'HUM', 'HII', 'HUN', 'H', 'HY', 'IAG', 'IBN', 'IDA', 'IEX', 'IDT', 'ITW', 'IMN', 'IMAX', 'IMPV', 'ICD', 'IHC', 'IFN', 'IBA', 'BLOX', 'INFY', 'HIFR', 'ING', 'INZ', 'ISF', 'ISG', 'ISP', 'IR', 'NGVT', 'IM', 'INGR', 'IPHI', 'NSP', 'IBP', 'INST', 'ITGR', 'I', 'ICE', 'IHG', 'IFF', 'IBM', 'IGT', 'IP', 'IOC', 'IPG', 'IPL^D', 'INXN', 'IL', 'SNOW', 'IPI', 'XON', 'IVC', 'INVN', 'VBF', 'VCV', 'VTA', 'VLT', 'IVR', 'IVR^B', 'IVR^A', 'OIA', 'VMO', 'VKQ', 'VPV', 'IVZ', 'IQI', 'VVR', 'VTN', 'VGM', 'IIM', 'ITG', 'IRET', 'IRET^', 'IRET^B', 'NVTA', 'IO', 'IRM', 'IRS', 'ICL', 'STAR', 'STAR^D', 'STAR^E', 'STAR^F', 'STAR^G', 'STAR^I', 'ITCB', 'ITUB', 'ITT', 'IVH', 'JPM', 'JPM.WS', 'JPM^A', 'JPM^B', 'JPM^D', 'JPM^E', 'JPM^F', 'JPM^G', 'JPM^H', 'JAX', 'JCP', 'SJM', 'JBL', 'JEC', 'JHX', 'JNS', 'JOF', 'JCAP', 'JKS', 'JMP', 'JMPB', 'JMPC', 'JBT', 'BTO', 'HEQ', 'JHS', 'JHI', 'HPF', 'HPI', 'HPS', 'PDT', 'HTD', 'HTY', 'JW.A', 'JW.B', 'JNJ', 'JCI', 'JONE', 'JLL', 'JOY', 'JPEP', 'JFC', 'JMEI', 'JNPR', 'JP', 'JE', 'LRN', 'KAI', 'KDMN', 'KAMN', 'KSU', 'KSU^', 'KS', 'KAR', 'KATE', 'KED', 'KYE', 'KMF', 'KYN', 'KYN^F', 'KB', 'KBH', 'KBR', 'KAP', 'KCG', 'K', 'KEM', 'KMPA', 'KMPR', 'KMT', 'KW', 'KWN', 'KEN', 'KEY', 'KEY^G', 'KEY^H', 'KEYS', 'KRC', 'KRC^G', 'KRC^H', 'KMB', 'KIM', 'KIM^I', 'KIM^J', 'KIM^K', 'KMI', 'KMI.WS', 'KMI^A', 'KND', 'KFS', 'KGC', 'KEX', 'KRG', 'KKR', 'KKR^A', 'KKR^B', 'KFH', 'KFI', 'KFN^', 'KIO', 'KMG', 'KNX', 'KNL', 'KNOP', 'KN', 'KSS', 'PHG', 'KOP', 'KEP', 'KEF', 'KF', 'KFY', 'KOS', 'KRA', 'KR', 'KRO', 'KT', 'KYO', 'LB', 'SCX', 'LLL', 'LQ', 'LH', 'LADR', 'LDR', 'LCI', 'LPI', 'LVS', 'LHO', 'LHO^H', 'LHO^I', 'LHO^J', 'LFL', 'LDF', 'LGI', 'LAZ', 'LOR', 'LZB', 'LEA', 'LEE', 'BWG', 'LM', 'LMHA', 'LMHB', 'LEG', 'CVB', 'JBK', 'KCC', 'KTH', 'KTN', 'KTP', 'XKE', 'LDOS', 'LEJU', 'LC', 'LEN', 'LEN.B', 'LII', 'LUK', 'LVLT', 'LXP', 'LXP^C', 'LXK', 'LPL', 'USA', 'ASG', 'LPT', 'LSI', 'LOCK', 'LITB', 'LNC', 'LNC.WS', 'LNN', 'LN', 'LNKD', 'LGF', 'LAD', 'LYV', 'LYG', 'SCD', 'LMT', 'L', 'LPX', 'LOW', 'LXU', 'LKSD', 'LTC', 'LUB', 'LL', 'LXFR', 'LXFT', 'LUX', 'LDL', 'WLH', 'LYB', 'MTB', 'MTB.WS', 'MTB^', 'MTB^C', 'MDC', 'MHO', 'MHO^A', 'MAC', 'CLI', 'MGU', 'MIC', 'MFD', 'BMA', 'M', 'MCN', 'MSP', 'MMP', 'MGA', 'MX', 'MH^A', 'MH^C', 'MHLA', 'MHNB', 'MHNC', 'MAIN', 'MSCA', 'MMD', 'MNK', 'MZF', 'MANU', 'MTW', 'MFS', 'MN', 'MAN', 'MFC', 'MRO', 'MPC', 'MMI', 'MCS', 'MRIN', 'MHG', 'MPX', 'HZO', 'MKL', 'VAC', 'MMC', 'MLM', 'MAS', 'DOOR', 'MTZ', 'MA', 'MTDR', 'MTRN', 'MATX', 'MLP', 'MMS', 'MXL', 'MBI', 'MNI', 'MKC', 'MKC.V', 'MDR', 'MCD', 'MUX', 'MCK', 'MDU', 'MJN', 'MTL', 'MTL^', 'MRT', 'MEG', 'MPW', 'MED', 'MCC', 'MCQ', 'MCV', 'MCX', 'MDLX', 'MDLY', 'MD', 'MDT', 'MRK', 'MCY', 'MDP', 'MTH', 'MTOR', 'MER^K', 'MER^P', 'PIY', 'MTR', 'MSB', 'MPG', 'MEI', 'MET', 'MET^A', 'MTD', 'MXE', 'MXF', 'MFA', 'MFA^B', 'MFO', 'MFCB', 'MCR', 'MGF', 'MIN', 'MMT', 'MFM', 'MFV', 'MTG', 'MGP', 'MGM', 'KORS', 'MAA', 'MEP', 'MSL', 'MCRN', 'MLR', 'HIE', 'MTX', 'MP^D', 'MG', 'MTU', 'MIXT', 'MFG', 'MBT', 'MBLY', 'MODN', 'MOD', 'MC', 'MHK', 'MOH', 'TAP', 'TAP.A', 'MNR', 'MNR^B', 'MNR^C', 'MORE', 'MON', 'MWW', 'MCO', 'MOG.A', 'MOG.B', 'MS', 'MS^A', 'MS^E', 'MS^F', 'MS^G', 'MS^I', 'APF', 'CAF', 'MSD', 'EDD', 'MSF', 'IIF', 'MOS', 'MSI', 'MOV', 'MPLX', 'MRC', 'ICB', 'HJV', 'MSA', 'MSM', 'MSCI', 'MSG', 'MSGN', 'MLI', 'MWA', 'MPSX', 'MUR', 'MUSA', 'MVO', 'MVC', 'MVCB', 'MYE', 'NBR', 'NC', 'NTP', 'NTEST', 'NTEST.A', 'NTEST.B', 'NTEST.C', 'NBHC', 'NFG', 'NGG', 'NHI', 'NOV', 'NPK', 'NNN', 'NNN^D', 'NNN^E', 'NNN^F', 'SID', 'NSA', 'NSM', 'NW^C', 'NGS', 'NGVC', 'NRP', 'NTZ', 'NLS', 'NCI', 'NVGS', 'NNA', 'NM', 'NM^G', 'NM^H', 'NAP', 'NMM', 'NAV', 'NAV^D', 'NCS', 'NCR', 'NP', 'NEFF', 'NNI', 'NPTN', 'N', 'NSR', 'NVRO', 'HYB', 'GF', 'NWHM', 'IRL', 'NEWM', 'NMFC', 'EDU', 'NEWR', 'NRZ', 'SNR', 'NWY', 'NYCB', 'NYCB^U', 'NYRT', 'NYT', 'NCT', 'NCT^B', 'NCT^C', 'NCT^D', 'NWL', 'NFX', 'NJR', 'NEU', 'NEM', 'NR', 'NXRT', 'NEP', 'NEE', 'NEE^C', 'NEE^G', 'NEE^H', 'NEE^I', 'NEE^J', 'NEE^K', 'NEE^Q', 'NEE^R', 'NGL', 'NMK^B', 'NMK^C', 'NLSN', 'NKE', 'NMBL', 'NTT', 'NI', 'NL', 'NOAH', 'NE', 'NBL', 'NBLX', 'NOK', 'NOMD', 'NMR', 'OSB', 'NORD', 'NAO', 'NAT', 'JWN', 'NSC', 'NTL', 'NOA', 'NADL', 'NRT', 'NOC', 'NSAM', 'NRE', 'NRF', 'NRF^A', 'NRF^B', 'NRF^C', 'NRF^D', 'NRF^E', 'NWN', 'NWE', 'NVS', 'NVO', 'DNOW', 'NQ', 'NRG', 'NYLD', 'NYLD.A', 'DCM', 'NUS', 'NUE', 'NS', 'NSH', 'NSS', 'JMLP', 'NUV', 'NUW', 'NEA', 'NAZ', 'NBB', 'NBD', 'NKX', 'NAC', 'NCB', 'NCA', 'NTC', 'JCE', 'JQC', 'JDD', 'NVG', 'DIAX', 'JMF', 'NZF', 'NEV', 'JPW', 'JFR', 'JRO', 'NKG', 'JGH', 'JHA', 'JHY', 'JHD', 'JHB', 'NXC', 'NXN', 'NID', 'NMY', 'NMT', 'NUM', 'NMS', 'NOM', 'JLS', 'JMM', 'NHA', 'NMZ', 'NMI', 'NXJ', 'NRK', 'NAN', 'NYV', 'NNY', 'NNC', 'NUO', 'NQP', 'JPI', 'JPC', 'NAD', 'JPS', 'JRI', 'JRS', 'BXMX', 'SPXX', 'NIM', 'NXP', 'NXQ', 'NXR', 'NSL', 'JSD', 'JTD', 'JTA', 'NTX', 'NPV', 'NIQ', 'JMT', 'NVR', 'OAK', 'OAS', 'OXY', 'OII', 'OZM', 'OCIP', 'OCN', 'OFG', 'OFG^A', 'OFG^B', 'OFG^D', 'OGE', 'OIBR.C', 'OIS', 'ODC', 'ORI', 'OLN', 'OMAA', 'OMAM', 'OHI', 'OME', 'OMC', 'OMN', 'ASGN', 'ONDK', 'OGS', 'OLP', 'OB', 'OMF', 'OKS', 'OKE', 'OOMA', 'OPY', 'ORCL', 'ORAN', 'OA', 'ORC', 'OEC', 'ORN', 'IX', 'ORA', 'OSK', 'OR', 'OUT', 'OSG', 'OMI', 'OC', 'OI', 'OXM', 'PAI', 'ROYT', 'PACD', 'PCG', 'PKG', 'PANW', 'PAM', 'P', 'PHX', 'PAR', 'PGRE', 'PKE', 'PKD', 'PH', 'PKY', 'PE', 'PRE^D.CL', 'PRE^E.CL', 'PRE^F', 'PRE^G', 'PRE^H', 'PRE^I', 'PRTY', 'PTHN', 'PN', 'PAYC', 'PBF', 'PBFX', 'PSO', 'PEB', 'PEB^C', 'PEB^D', 'PBA', 'PGH', 'PWE', 'PNTA', 'PEI', 'PEI^A', 'PEI^B', 'PFSI', 'PMT', 'PAG', 'PNR', 'PEN', 'PEP', 'PFGC', 'PSG', 'PKI', 'PBT', 'PRGO', 'PZE', 'PTR', 'PBR', 'PBR.A', 'PQ', 'PFE', 'PMC', 'PHH', 'PM', 'PSX', 'PSXP', 'FENG', 'DOC', 'PDM', 'PIR', 'PCQ', 'PCK', 'PZC', 'PCM', 'PTY', 'PCN', 'PCI', 'PDI', 'PGP', 'PHK', 'PKO', 'PFL', 'PFN', 'PMF', 'PML', 'PMX', 'PNF', 'PNI', 'PYN', 'RCS', 'PF', 'PNW', 'PES', 'PHD', 'PHT', 'MAV', 'MHI', 'PXD', 'PJC', 'PBI', 'PBI^B', 'PJT', 'PAA', 'PAGP', 'PLNT', 'PLT', 'PAH', 'PHI', 'PGEM', 'PNC', 'PNC.WS', 'PNC^P', 'PNC^Q', 'PNM', 'PII', 'POL', 'POR', 'PKX', 'POST', 'PPS', 'PPS^A', 'POT', 'PPG', 'PPX', 'PPL', 'PYS', 'PYT', 'PX', 'PDS', 'APTS', 'PGND', 'PBH', 'PVG', 'PRI', 'PPP', 'PFG', 'PGZ', 'PVTD', 'PRA', 'PG', 'PGR', 'PLD', 'PRO', 'PBB', 'PB', 'PL^C', 'PL^E', 'PRLB', 'PFS', 'PFK', 'PJH', 'PRH', 'PRU', 'GHY', 'PUK', 'PUK^', 'PUK^A', 'ISD', 'PSB', 'PSB^S', 'PSB^T', 'PSB^U', 'PSB^V', 'TLK', 'PEG', 'PSA', 'PSA^A', 'PSA^B', 'PSA^C', 'PSA^D', 'PSA^S', 'PSA^T', 'PSA^U', 'PSA^V', 'PSA^W', 'PSA^X', 'PSA^Y', 'PSA^Z', 'PHM', 'PBYI', 'PSTG', 'PCF', 'PMM', 'PIM', 'PMO', 'PPT', 'PVH', 'PZN', 'QTWO', 'QEP', 'QTS', 'QUAD', 'KWR', 'NX', 'PWR', 'QTM', 'DGX', 'Q', 'QHC', 'QUOT', 'CTAA', 'CTBB', 'CTU', 'CTV', 'CTW', 'CTX', 'CTY', 'CTZ', 'RRD', 'RAX', 'RDN', 'RAS', 'RAS^A', 'RAS^B', 'RAS^C', 'RFT', 'RFTA', 'RL', 'RPT', 'RPT^D', 'RRC', 'RJD', 'RJF', 'RYAM', 'RYAM^A', 'RYN', 'RTN', 'RMAX', 'RLGY', 'O', 'O^F', 'RHT', 'RLH', 'RWT', 'RBC', 'RGC', 'REG', 'REG^F', 'REG^G', 'RM', 'RF', 'RF^A', 'RF^B', 'RGS', 'RGA', 'RZA', 'RZB', 'RS', 'RENX', 'RELX', 'RNR', 'RNR^C', 'RNR^E', 'SOL', 'RENN', 'RSG', 'RMD', 'REN', 'RFP', 'RSO', 'RSO^A', 'RSO^B', 'RSO^C', 'QSR', 'RH', 'RPAI', 'RPAI^A', 'REV', 'REX', 'REXR', 'REXR^A', 'RXN', 'RAI', 'RICE', 'RMP', 'RNG', 'RIO', 'RBA', 'RAD', 'RIV', 'OPP', 'RLI', 'RLJ', 'RRTS', 'RHI', 'ROK', 'COL', 'RCI', 'ROG', 'ROL', 'ROP', 'RST', 'RDC', 'RY', 'RY^S', 'RY^T', 'RBS', 'RBS^F', 'RBS^H', 'RBS^L', 'RBS^S', 'RCL', 'RDS.A', 'RDS.B', 'RGT', 'RMT', 'RVT', 'RES', 'RPM', 'RSPP', 'RT', 'RTEC', 'R', 'RYI', 'RHP', 'SPGI', 'SBR', 'SB', 'SB^B', 'SB^C', 'SB^D', 'SFE', 'CRM', 'SMM', 'SBH', 'SJT', 'SN', 'SD', 'SDT', 'SDR', 'PER', 'SNY', 'SC', 'SOV^C', 'SAP', 'SAQ', 'SAR', 'SSL', 'BFS', 'BFS^C', 'SCG', 'SLB', 'SWM', 'SAIC', 'SALT', 'SLTB', 'SBNA', 'SBNB', 'STNG', 'SMG', 'LBF', 'KHI', 'KMM', 'KTF', 'KST', 'KSM', 'SA', 'CKH', 'SDRL', 'SDLP', 'SEE', 'SSW', 'SSW^D', 'SSW^E', 'SSW^G', 'SSW^H', 'SSWN', 'SEAS', 'JBN', 'JBR', 'SEM', 'SGZA', 'SEMG', 'SMI', 'SRE', 'ST', 'SXT', 'SQNS', 'SRG', 'SCI', 'SERV', 'NOW', 'SHAK', 'SJR', 'SHLX', 'SHW', 'SHG', 'SFL', 'SHOP', 'SSTK', 'SBGL', 'SIG', 'SBY', 'SSNI', 'SLW', 'SPG', 'SPG^J', 'SSD', 'SHI', 'SITE', 'SIX', 'SJW', 'SKM', 'SKX', 'SLG', 'SLG^I', 'SM', 'SFS', 'SNN', 'AOS', 'SNA', 'SQM', 'SLRA', 'SAH', 'SON', 'SNE', 'BID', 'SOR', 'SJI', 'SXE', 'SCE^F', 'SCE^G', 'SCE^H', 'SCE^J', 'SCE^K', 'SO', 'SOJA', 'SOJB', 'SCCO', 'LUV', 'SWX', 'SWN', 'SWNC', 'SPA', 'STN', 'SPE', 'SPE^B', 'SE', 'SEP', 'SPB', 'TRK', 'SR', 'SPR', 'SRC', 'SRLP', 'S', 'SPXC', 'FLOW', 'SQ', 'JOE', 'STJ', 'STAG', 'STAG^A.CL', 'STAG^B', 'STAG^C', 'SSI', 'SMP', 'SXI', 'SWH', 'SWJ', 'SWK', 'SGU', 'SRT', 'STWD', 'STT', 'STT^C', 'STT^D', 'STT^E', 'STT^G', 'STO', 'SPLP', 'SCS', 'SCM', 'SCQ', 'SCL', 'STE', 'STL', 'STC', 'SF', 'SF^A', 'SWC', 'STM', 'SGY', 'EDF', 'EDI', 'SGM', 'STON', 'SRI', 'STOR', 'GJH', 'GJO', 'GJS', 'SYK', 'RGR', 'SPH', 'SCNB', 'SMFG', 'INN', 'INN^A.CL', 'INN^B', 'INN^C', 'INN^D', 'SUM', 'SMLP', 'SUI', 'SUI^A', 'SLF', 'SXCP', 'SXC', 'SU', 'SXL', 'SUN', 'SHO', 'SHO^E', 'SHO^F', 'STI', 'STI.WS.A', 'STI.WS.B', 'STI^A', 'STI^E', 'SPN', 'SUP', 'SVU', 'SWFT', 'SWZ', 'SYF', 'SYT', 'SNX', 'SNV', 'SNV^C', 'GJP', 'GJR', 'GJT', 'GJV', 'SYY', 'SYX', 'DATA', 'TAHO', 'TLRD', 'TWN', 'TSM', 'XRS', 'TLN', 'TEGP', 'TEP', 'SKT', 'NGLS^A', 'TRGP', 'TGT', 'TARO', 'TTM', 'TCO', 'TCO^J', 'TCO^K', 'TMHC', 'TCP', 'TCB', 'TCB.WS', 'TCB^B', 'TCB^C', 'TCPI', 'TSI', 'TEL', 'TMH', 'TISI', 'TCK', 'TK', 'TGP', 'TGP^A', 'TOO', 'TOO^A', 'TOO^B', 'TNK', 'GCI', 'TGNA', 'TRC', 'HQH', 'THQ', 'HQL', 'THW', 'TDOC', 'TEO', 'TI', 'TI.A', 'TDY', 'TFX', 'VIV', 'TEF', 'TDA', 'TDE', 'TDI', 'TDJ', 'TDS', 'TU', 'TDF', 'EMF', 'TEI', 'GIM', 'TPX', 'TS', 'THC', 'TNC', 'TEN', 'TVC', 'TVE', 'TDC', 'TER', 'TEX', 'TX', 'TNH', 'TRNO', 'TRNO^A', 'TSO', 'TLLP', 'TTI', 'TEVA', 'TPL', 'TGH', 'TXT', 'TTF', 'AES', 'AES^C', 'BX', 'SCHW', 'SCHW^B', 'SCHW^C', 'SCHW^D', 'SRV', 'GRX', 'GRX^A', 'GRX^B', 'GDL', 'GDL^B', 'THG', 'THGA', 'RUBI', 'TRV', 'TMO', 'THR', 'TPRE', 'TSLF', 'TCRX', 'TCRZ', 'TRI', 'THO', 'TDW', 'TIER', 'TIF', 'TLYS', 'TSU', 'TIME', 'TWX', 'TKR', 'TMST', 'TWI', 'TJX', 'TOL', 'TR', 'BLD', 'TMK', 'TMK^B', 'TMK^C', 'TTC', 'TD', 'NDP', 'TYG', 'NTG', 'TTP', 'TPZ', 'TSS', 'TOT', 'TOWR', 'TSQ', 'TM', 'TSLX', 'TAC', 'TRP', 'TCI', 'TDG', 'TLP', 'RIG', 'RIGP', 'TGS', 'TRU', 'TVPT', 'TRR', 'TREC', 'TG', 'THS', 'TRMR', 'TREX', 'TY', 'TY^', 'TPH', 'TCAP', 'TCCA', 'TCCB', 'TRCO', 'TSL', 'TNET', 'TRN', 'TSE', 'TPVG', 'TPVZ', 'GTS', 'TRTN', 'TGI', 'TROX', 'TBI', 'TNP', 'TNP^B', 'TNP^C', 'TNP^D', 'TUP', 'TKC', 'TKF', 'TPB', 'TRQ', 'TPC', 'TWLO', 'TWTR', 'TWO', 'TYL', 'TSN', 'TSNU', 'USB', 'USB^A', 'USB^H', 'USB^M', 'USB^N', 'USB^O', 'USPH', 'SLCA', 'UBS', 'UCP', 'UGI', 'UGP', 'UMH', 'UMH^A', 'UMH^B', 'UA', 'UA.C', 'UFI', 'UNF', 'UN', 'UL', 'UNP', 'UIS', 'UNT', 'UAL', 'UDR', 'UMC', 'UPS', 'URI', 'USM', 'UZA', 'UZB', 'UZC', 'X', 'UTX', 'UNH', 'UTL', 'UNVR', 'UAM', 'UVV', 'UHT', 'UHS', 'UVE', 'UTI', 'UNM', 'UE', 'UBA', 'UBP', 'UBP^F', 'UBP^G', 'USFD', 'USAC', 'USNA', 'USDP', 'USG', 'BIF', 'VFC', 'EGY', 'MTN', 'VALE', 'VALE.P', 'VRX', 'VLO', 'VLP', 'VHI', 'VR', 'VR^A', 'VLY', 'VLY.WS', 'VLY^A', 'VMI', 'VAL', 'VVV', 'VNTV', 'VAR', 'VGR', 'VVC', 'VEC', 'VEDL', 'VEEV', 'VTRB', 'VTR', 'VER', 'VER^F', 'PAY', 'VRTV', 'VZ', 'VZA', 'VET', 'VRS', 'VSM', 'VVI', 'VCO', 'VNCE', 'VMEM', 'VIPS', 'ZTR', 'VGI', 'DCA', 'V', 'VSH', 'VPG', 'VSTO', 'VC', 'VSI', 'VSLR', 'VMW', 'VOC', 'VCRA', 'VG', 'VNO', 'VNO^G', 'VNO^I', 'VNO^K', 'VNO^L', 'VJET', 'IAE', 'IHD', 'VOYA', 'IGA', 'IGD', 'IDE', 'IID', 'IRR', 'PPR', 'VTTI', 'VMC', 'WTI', 'WPC', 'WRB', 'WRB^B', 'WRB^C', 'WRB^D', 'GRA', 'GWW', 'WNC', 'WBC', 'WDR', 'WAGE', 'WD', 'WMT', 'DIS', 'WAC', 'WPG', 'WPG^H', 'WPG^I', 'WRE', 'WCN', 'WM', 'WAT', 'WSO', 'WSO.B', 'WTS', 'W', 'WCIC', 'WFT', 'WBS', 'WBS^E', 'WEC', 'WTW', 'WRI', 'WMK', 'WCG', 'WFC', 'WFC.WS', 'WFC^J', 'WFC^L', 'WFC^N', 'WFC^O', 'WFC^P', 'WFC^Q', 'WFC^R', 'WFC^T', 'WFC^V', 'WFC^W', 'WFC^X', 'WFE^A', 'EOD', 'HCN', 'HCN^I', 'HCN^J', 'WAIR', 'WCC', 'WST', 'WR', 'WAL', 'WALA', 'WEA', 'TLI', 'ESD', 'EMD', 'GDO', 'EHI', 'HIX', 'HIO', 'HYI', 'IGI', 'MMU', 'WMC', 'DMO', 'MTT', 'MHF', 'MNP', 'GFY', 'SBW', 'WIW', 'WIA', 'WGP', 'WES', 'WNRL', 'WNR', 'WU', 'WAB', 'WLK', 'WLKP', 'WMLP', 'WBK', 'WRK', 'WHG', 'WEX', 'WY', 'WGL', 'WHR', 'WTM', 'WSR', 'WWAV', 'WLL', 'WG', 'WMB', 'WPZ', 'WSM', 'WGO', 'WIT', 'WNS', 'WWW', 'WF', 'WDAY', 'WK', 'INT', 'WPT', 'WWE', 'WOR', 'WPX', 'WPXP', 'WYN', 'XTLY', 'XEL', 'XHR', 'XRM', 'XRX', 'XIN', 'XL', 'XOXO', 'XPO', 'XYL', 'YDKN', 'AUY', 'YZC', 'YELP', 'YGE', 'YRD', 'YPF', 'YUM', 'YUME', 'ZFC', 'ZAYO', 'ZEN', 'ZPIN', 'ZBH', 'ZB^A', 'ZB^F', 'ZB^G', 'ZB^H', 'ZBK', 'ZOES', 'ZTS', 'ZF'];
var arNasdaqSymbols = ['PIH', 'FLWS', 'FCCY', 'SRCE', 'VNET', 'TWOU', 'JOBS', 'CAFD', 'EGHT', 'AVHI', 'SHLM', 'AAON', 'ABAX', 'ABEO', 'ABEOW', 'ABIL', 'ABMD', 'AXAS', 'ACIU', 'ACIA', 'ACTG', 'ACHC', 'ACAD', 'ACST', 'AXDX', 'XLRN', 'ANCX', 'ARAY', 'ACRX', 'ACET', 'AKAO', 'ACHN', 'ACIW', 'ACRS', 'ACNB', 'ACOR', 'ACTS', 'ACPW', 'ATVI', 'ACTA', 'ACUR', 'ACXM', 'ADMS', 'ADMP', 'ADAP', 'ADUS', 'AEY', 'IOTS', 'ADMA', 'ADBE', 'ADTN', 'ADRO', 'AAAP', 'ADES', 'AEIS', 'AMD', 'ADXS', 'ADXSW', 'ADVM', 'MAUI', 'YPRO', 'AEGR', 'AEGN', 'AGLE', 'AEHR', 'AMTX', 'AEPI', 'AERI', 'AVAV', 'AEZS', 'AEMD', 'AFMD', 'AGEN', 'AGRX', 'AGYS', 'AGIO', 'AGNC', 'AGNCB', 'AGNCP', 'AGFS', 'AGFSW', 'AIMT', 'AIRM', 'AIRT', 'ATSG', 'AIRG', 'AMCN', 'AIXG', 'AKAM', 'AKTX', 'AKBA', 'AKER', 'AKRX', 'ALRM', 'ALSK', 'AMRI', 'ABDC', 'ADHD', 'ALDR', 'ALDX', 'ALXN', 'ALCO', 'ALGN', 'ALIM', 'ALJJ', 'ALKS', 'ABTX', 'ALGT', 'AIQ', 'AHGP', 'AMMA', 'ARLP', 'AHPI', 'AMOT', 'ALQA', 'ALLT', 'MDRX', 'AFAM', 'ALNY', 'AOSL', 'GOOG', 'GOOGL', 'SMCP', 'ATEC', 'ASPS', 'AIMC', 'AMAG', 'AMRN', 'AMRK', 'AYA', 'AMZN', 'AMBC', 'AMBCW', 'AMBA', 'AMCX', 'DOX', 'AMDA', 'AMED', 'UHAL', 'ATAX', 'AMOV', 'AAL', 'ACSF', 'ACAS', 'AETI', 'AMNB', 'ANAT', 'APEI', 'ARII', 'AMRB', 'AMSWA', 'AMSC', 'AMWD', 'CRMT', 'ABCB', 'AMSF', 'ASRV', 'ASRVP', 'ATLO', 'AMGN', 'FOLD', 'AMKR', 'AMPH', 'IBUY', 'AMSG', 'AMSGP', 'ASYS', 'AFSI', 'AMRS', 'ADI', 'ALOG', 'AVXL', 'ANCB', 'ANDA', 'ANDAR', 'ANDAU', 'ANDAW', 'ANGI', 'ANGO', 'ANIP', 'ANIK', 'ANSS', 'ATRS', 'ANTH', 'ABAC', 'APIC', 'APOG', 'APOL', 'AINV', 'APPF', 'AAPL', 'ARCI', 'APDN', 'APDNW', 'AGTC', 'AMAT', 'AMCC', 'AAOI', 'AREX', 'APTI', 'APRI', 'APVO', 'APTO', 'AQMS', 'AQXP', 'ARDM', 'ARLZ', 'PETX', 'ABUS', 'ARCW', 'ABIO', 'RKDA', 'ARCB', 'ACGL', 'ACGLP', 'APLP', 'ACAT', 'ARDX', 'ARNA', 'ARCC', 'AGII', 'AGIIL', 'ARGS', 'ARIS', 'ARIA', 'ARKR', 'ARTX', 'ARWA', 'ARWAR', 'ARWAU', 'ARWAW', 'ARQL', 'ARRY', 'ARRS', 'DWAT', 'AROW', 'ARWR', 'ARTNA', 'ARTW', 'ASBB', 'ASNA', 'ASND', 'ASCMA', 'APWC', 'ASML', 'AZPN', 'ASMB', 'ASFI', 'ASTE', 'ATRO', 'ALOT', 'ASTC', 'ASUR', 'ATAI', 'ATRA', 'ATHN', 'ATHX', 'AAPC', 'AAME', 'ACBI', 'ACFC', 'ABY', 'ATLC', 'AAWW', 'AFH', 'TEAM', 'ATNI', 'ATMR', 'ATOS', 'ATRC', 'ATRI', 'ATTU', 'LIFE', 'AUBN', 'BOLD', 'AUDC', 'AUPH', 'EARS', 'ABTL', 'ADSK', 'ADP', 'AVEO', 'AVXS', 'AVNW', 'AVID', 'AVGR', 'AVIR', 'CAR', 'AHPAU', 'AWRE', 'AXAR', 'AXARU', 'AXARW', 'ACLS', 'AXGN', 'AXSM', 'AXTI', 'AZRX', 'BCOM', 'RILY', 'BOSC', 'BEAV', 'BIDU', 'BCPC', 'BWINA', 'BWINB', 'BLDP', 'BANF', 'BANFP', 'BCTF', 'BKMU', 'BOCH', 'BMRC', 'BKSC', 'BOTJ', 'OZRK', 'BFIN', 'BWFG', 'BANR', 'BZUN', 'TAPR', 'BHAC', 'BHACR', 'BHACU', 'BHACW', 'BBSI', 'BSET', 'BYBK', 'BV', 'BCBP', 'BECN', 'BSF', 'BBGI', 'BEBE', 'BBBY', 'BGNE', 'BELFA', 'BELFB', 'BLPH', 'BLCM', 'BNCL', 'BNFT', 'BNTC', 'BNTCW', 'BGCP', 'BGFV', 'BASI', 'ORPN', 'BIOC', 'BCRX', 'BIOD', 'BDSI', 'BIIB', 'BIOL', 'BLFS', 'BLRX', 'BMRN', 'BMRA', 'BVXV', 'BVXVW', 'BPTH', 'BIOS', 'BBC', 'BBP', 'BSTC', 'BSTG', 'BSPM', 'TECH', 'BEAT', 'BJRI', 'BBOX', 'BDE', 'BLKB', 'BBRY', 'HAWK', 'BKCC', 'ADRA', 'ADRD', 'ADRE', 'ADRU', 'BLMN', 'BCOR', 'BLBD', 'BUFF', 'BHBK', 'NILE', 'BLUE', 'BKEP', 'BKEPP', 'BPMC', 'ITEQ', 'BMCH', 'BNCN', 'BOBE', 'BOFI', 'BOFIL', 'WIFI', 'BOJA', 'BOKF', 'BOKFL', 'BNSO', 'BPFH', 'BPFHP', 'BPFHW', 'EPAY', 'BLVD', 'BLVDU', 'BLVDW', 'BCLI', 'BBRG', 'BDGE', 'BLIN', 'BRID', 'BCOV', 'AVGO', 'BSFT', 'BVSN', 'BYFC', 'BWEN', 'BRCD', 'BRKL', 'BRKS', 'BRKR', 'BMTC', 'BLMT', 'BSQR', 'BWLD', 'BLDR', 'BMLA', 'BUR', 'CFFI', 'CHRW', 'CA', 'CCMP', 'CDNS', 'CDZI', 'CACQ', 'CZR', 'CSTE', 'PRSS', 'CLBS', 'CLMS', 'CHY', 'CHI', 'CCD', 'CHW', 'CGO', 'CSQ', 'CAMP', 'CVGW', 'CFNB', 'CALA', 'CALD', 'CALM', 'CLMT', 'ABCD', 'CAC', 'CAMT', 'CSIQ', 'CGIX', 'CPHC', 'CPLA', 'CBF', 'CCBG', 'CPLP', 'CSWC', 'CPTA', 'CLAC', 'CLACU', 'CLACW', 'CFFN', 'CAPN', 'CAPNW', 'CAPR', 'CSTR', 'CPST', 'CARA', 'CARB', 'CBYL', 'CCN', 'CCNWW', 'CFNL', 'CRME', 'CSII', 'CATM', 'CDNA', 'CECO', 'CTRE', 'CKEC', 'CLBH', 'CARO', 'CART', 'CRZO', 'TAST', 'CRTN', 'CARV', 'CASM', 'CACB', 'CASC', 'CWST', 'CASY', 'CASI', 'CASS', 'CATB', 'CBIO', 'CPRX', 'CATY', 'CATYW', 'CVCO', 'CAVM', 'CBFV', 'CBOE', 'CDK', 'CDW', 'CECE', 'CELG', 'CELGZ', 'CLDX', 'APOP', 'APOPW', 'CLRB', 'CLRBW', 'CLRBZ', 'CLLS', 'CBMG', 'CLSN', 'CYAD', 'CEMP', 'CETX', 'CDEV', 'CDEVW', 'CSFL', 'CETV', 'CFBK', 'CENT', 'CENTA', 'CVCY', 'CFCB', 'CENX', 'CNBKA', 'CNTY', 'CPHD', 'CRNT', 'CERC', 'CERCW', 'CERCZ', 'CERN', 'CERU', 'CERS', 'KOOL', 'CEVA', 'CFCO', 'CFCOU', 'CFCOW', 'CSBR', 'CYOU', 'HOTR', 'HOTRW', 'CTHR', 'GTLS', 'CHTR', 'CHFN', 'CHKP', 'CHEK', 'CHEKW', 'CEMI', 'CHFC', 'CCXI', 'CHMG', 'CHKE', 'CHMA', 'CBNK', 'PLCE', 'CMRX', 'CADC', 'CALI', 'CAAS', 'CBAK', 'CBPO', 'CCCL', 'CCCR', 'CCRC', 'JRJC', 'HGSH', 'CNIT', 'CJJD', 'CLDC', 'CLDCW', 'HTHT', 'CHNR', 'CREG', 'CNTF', 'CXDC', 'CCIH', 'CNET', 'IMOS', 'CDXC', 'CHSCL', 'CHSCM', 'CHSCN', 'CHSCO', 'CHSCP', 'CHDN', 'CHUY', 'CDTX', 'CIFC', 'CMCT', 'CMPR', 'CINF', 'CIDM', 'CTAS', 'CPHR', 'CRUS', 'CSCO', 'CTRN', 'CZNC', 'CZWI', 'CZFC', 'CIZN', 'CTXS', 'CHCO', 'CIVB', 'CIVBP', 'CDTI', 'CLNE', 'CLNT', 'CLFD', 'CLRO', 'CLSD', 'CLIR', 'CBLI', 'CSBK', 'CLVS', 'CMFN', 'CME', 'CCNE', 'CISG', 'CNV', 'CWAY', 'COBZ', 'COKE', 'CDXS', 'CVLY', 'JVA', 'CCOI', 'CGNT', 'COGT', 'CGNX', 'CTSH', 'COHR', 'CHRS', 'COHU', 'CLCT', 'COLL', 'CIGI', 'CBAN', 'CLCD', 'COLB', 'COLM', 'CMCO', 'CBMX', 'CBMXW', 'CMCSA', 'CBSH', 'CBSHP', 'CUBN', 'CHUBA', 'CHUBK', 'CVGI', 'COMM', 'CSAL', 'JCS', 'ESXB', 'CYHHZ', 'CTBI', 'CWBC', 'COB', 'CVLT', 'CGEN', 'CPSI', 'CTG', 'SCOR', 'CHCI', 'CMTL', 'CNAT', 'CNCE', 'CXRX', 'CCUR', 'CDOR', 'CFMS', 'CNFR', 'CNMD', 'CTWS', 'CNOB', 'CNXR', 'CONN', 'CNSL', 'CWCO', 'CPSS', 'CFRX', 'CFRXW', 'CTRV', 'CTRL', 'CPAA', 'CPAAU', 'CPAAW', 'CPRT', 'COYN', 'COYNW', 'CRBP', 'CORT', 'CORE', 'CORI', 'CSOD', 'CRVL', 'CRVS', 'CSGP', 'COST', 'CPAH', 'ICBK', 'COUP', 'CVTI', 'COVS', 'COWN', 'COWNL', 'PMTS', 'CPSH', 'CRAI', 'CBRL', 'BREW', 'CRAY', 'CACC', 'GLDI', 'SLVO', 'CREE', 'CRESY', 'CRTO', 'CROX', 'CCRN', 'XRDC', 'CRDS', 'CRWS', 'CYRX', 'CYRXW', 'CSGS', 'CCLP', 'CSPI', 'CSWI', 'CSX', 'CTIC', 'CTIB', 'CTRP', 'CUNB', 'CUI', 'CPIX', 'CMLS', 'CRIS', 'CUTR', 'CVBF', 'CVV', 'CYAN', 'CYBR', 'CYBE', 'CYCC', 'CYCCP', 'CBAY', 'CYNA', 'CYNO', 'CY', 'CYRN', 'CONE', 'CYTK', 'CTMX', 'CYTX', 'CYTXW', 'CTSO', 'CYTR', 'DJCO', 'DAKT', 'DRIO', 'DRIOW', 'DZSI', 'DAIO', 'DTLK', 'DRAM', 'DWCH', 'PLAY', 'DTEA', 'DWSN', 'DBVT', 'DHRM', 'DFRG', 'TACO', 'TACOW', 'DCTH', 'DMPI', 'DGAS', 'DELT', 'DELTW', 'DENN', 'XRAY', 'DEPO', 'DSCI', 'DERM', 'DEST', 'DXLG', 'DSWL', 'DTRM', 'DXCM', 'DXTR', 'DHXM', 'DHIL', 'FANG', 'DCIX', 'DRNA', 'DFBG', 'DGII', 'DMRC', 'DRAD', 'DGLY', 'APPS', 'DCOM', 'DMTX', 'DIOD', 'DPRX', 'DISCA', 'DISCB', 'DISCK', 'DISH', 'DVCR', 'SAUC', 'DLHC', 'DNBF', 'DLTR', 'DGICA', 'DGICB', 'DMLP', 'DORM', 'EAGL', 'EAGLU', 'EAGLW', 'DRWI', 'DRYS', 'DSKX', 'DSPG', 'DTSI', 'DLTH', 'DNKN', 'DRRX', 'DXPE', 'BOOM', 'DYSL', 'DYNT', 'DVAX', 'ETFC', 'EBMT', 'EGBN', 'EGLE', 'EGRX', 'ELNK', 'EWBC', 'EACQ', 'EACQU', 'EACQW', 'EML', 'EVBS', 'EVGBC', 'EVSTC', 'EVLMC', 'EBAY', 'EBAYL', 'EBIX', 'ELON', 'ECHO', 'SATS', 'EEI', 'ECAC', 'ECACR', 'ECACU', 'ESES', 'EDAP', 'EDGE', 'EDGW', 'EDIT', 'EDUC', 'EFUT', 'EGAN', 'EGLT', 'EHTH', 'EIGR', 'EKSO', 'LOCO', 'EMITF', 'ESLT', 'ERI', 'ESIO', 'EA', 'EFII', 'ELSE', 'ELEC', 'ELECU', 'ELECW', 'EBIO', 'DWAC', 'CAPX', 'ESBK', 'ELTK', 'EMCI', 'EMCF', 'EMKR', 'EMMS', 'NYNY', 'ERS', 'ENTA', 'ECPG', 'WIRE', 'ENDP', 'ECYT', 'ELGX', 'EIGI', 'WATT', 'EFOI', 'ERII', 'ENOC', 'ENG', 'ENPH', 'ESGR', 'ENFC', 'ENTG', 'ENTL', 'ETRM', 'EBTC', 'EFSC', 'EGT', 'ENZY', 'EPZM', 'PLUS', 'EQIX', 'EQFN', 'EQBK', 'EAC', 'ERIC', 'ERIE', 'ESCA', 'ESMC', 'ESPR', 'ESSA', 'EPIX', 'ESND', 'ETSY', 'CLWT', 'EEFT', 'ESEA', 'EVEP', 'EVBG', 'EVK', 'MRAM', 'EVLV', 'EVOK', 'EVOL', 'EXA', 'EXAS', 'EXAC', 'EXEL', 'EXFO', 'EXLS', 'EXPE', 'EXPD', 'EXPO', 'ESRX', 'XOG', 'EXTR', 'EYEG', 'EYEGW', 'EZPW', 'FFIV', 'FB', 'FRP', 'FALC', 'DAVE', 'FARM', 'FFKT', 'FMNB', 'FARO', 'FAST', 'FATE', 'FBSS', 'FBRC', 'FDML', 'FNHC', 'FHCO', 'FENX', 'GSM', 'FCSC', 'FGEN', 'ONEQ', 'LION', 'FDUS', 'FRGI', 'FSAM', 'FSC', 'FSCFL', 'FSFR', 'FITB', 'FITBI', 'FNGN', 'FISI', 'FNSR', 'FNJN', 'FEYE', 'FBNC', 'FNLC', 'FRBA', 'BUSE', 'FBIZ', 'FCAP', 'FCFS', 'FCNCA', 'FCBC', 'FCCO', 'FCFP', 'FBNK', 'FDEF', 'FFBC', 'FFBCW', 'FFIN', 'THFF', 'FFNW', 'FFWM', 'FGBI', 'FHB', 'INBK', 'INBKL', 'FIBK', 'FRME', 'FMBH', 'FMBI', 'FNBC', 'FNWB', 'FSFG', 'FSLR', 'FSBK', 'FAAR', 'FPA', 'BICK', 'FBZ', 'FCAN', 'FTCS', 'FCEF', 'FCA', 'FDT', 'FDTS', 'FVC', 'FV', 'IFV', 'FEM', 'FEMB', 'FEMS', 'FTSM', 'FEP', 'FEUZ', 'FGM', 'FTGC', 'FTHI', 'HYLS', 'FHK', 'FTAG', 'FTRI', 'FPXI', 'YDIV', 'SKYY', 'FJP', 'FEX', 'FTC', 'FTA', 'FLN', 'FTLB', 'LMBS', 'FMB', 'FMK', 'FNX', 'FNY', 'FNK', 'FAD', 'FAB', 'MDIV', 'MCEF', 'QABA', 'FTXO', 'QCLN', 'GRID', 'CIBR', 'FTXG', 'CARZ', 'FTXN', 'FTXH', 'FTXD', 'RDVY', 'FTXL', 'FONE', 'TDIV', 'FTXR', 'QQEW', 'QQXT', 'QTEC', 'AIRR', 'QINC', 'RFAP', 'RFDI', 'RFEM', 'RFEU', 'FTSL', 'FYX', 'FYC', 'FYT', 'FKO', 'FCVT', 'FDIV', 'FSZ', 'FTW', 'TUSA', 'FKU', 'FUNC', 'FUSB', 'SVVC', 'FSV', 'FISV', 'FIVE', 'FPRX', 'FVE', 'FIVN', 'FLML', 'FLEX', 'FLKS', 'FLXN', 'SKOR', 'LKOR', 'MBSD', 'ASET', 'ESGG', 'ESG', 'QLC', 'FLXS', 'FLIR', 'FLDM', 'FFIC', 'FOMX', 'FOGO', 'FONR', 'FES', 'FH', 'FORM', 'FORTY', 'FORR', 'FTNT', 'FBIO', 'FWRD', 'FORD', 'FWP', 'FOSL', 'FMI', 'FOXF', 'FRAN', 'FELE', 'FRED', 'RAIL', 'FEIM', 'FRPT', 'FTEO', 'FTR', 'FTRPR', 'FRPH', 'FSBW', 'FSBC', 'FTD', 'FTEK', 'FCEL', 'FLGT', 'FORK', 'FULL', 'FULLL', 'FLL', 'FMAX', 'FULT', 'FNCX', 'FSNN', 'FFHL', 'FXCM', 'GK', 'WILC', 'GAIA', 'GLPG', 'GALT', 'GALTU', 'GALTW', 'GALE', 'GLMD', 'GLPI', 'GPIC', 'GRMN', 'GARS', 'GEMP', 'GENC', 'GNCMA', 'GFN', 'GFNCP', 'GFNSL', 'GENE', 'GNMK', 'GNCA', 'GHDX', 'GNTX', 'THRM', 'GNVC', 'GTWN', 'GEOS', 'GABC', 'GERN', 'GEVO', 'ROCK', 'GIGM', 'GIGA', 'GIII', 'GILT', 'GILD', 'GBCI', 'GLAD', 'GLADO', 'GOOD', 'GOODM', 'GOODO', 'GOODP', 'GAIN', 'GAINM', 'GAINN', 'GAINO', 'LAND', 'LANDP', 'GLBZ', 'GBT', 'ENT', 'GBLI', 'GBLIZ', 'GPAC', 'GPACU', 'GPACW', 'SELF', 'GSOL', 'GWRS', 'KRMA', 'FINX', 'ACTX', 'BFIT', 'SNSR', 'LNGR', 'MILN', 'QQQC', 'BOTZ', 'CATH', 'SOCL', 'ALTY', 'SRET', 'YLCO', 'GLBS', 'GLUU', 'GLYC', 'GOGO', 'GLNG', 'GMLP', 'GDEN', 'GOGL', 'GBDC', 'GTIM', 'GPRO', 'GMAN', 'GRSH', 'GRSHU', 'GRSHW', 'GOV', 'GOVNI', 'GPIA', 'GPIAU', 'GPIAW', 'LOPE', 'GRVY', 'GEC', 'GLDD', 'GSBC', 'GNBC', 'GRBK', 'GPP', 'GPRE', 'GCBC', 'GLRE', 'GSUM', 'GRIF', 'GRFS', 'GRPN', 'OMAB', 'GGAL', 'GSIT', 'GSVC', 'GTXI', 'GBNK', 'GFED', 'GUID', 'GIFI', 'GURE', 'GPOR', 'GWPH', 'GWGH', 'GYRO', 'HEES', 'HLG', 'HNRG', 'HALL', 'HALO', 'HBK', 'HBHC', 'HBHCL', 'HNH', 'HAFC', 'HQCL', 'HONE', 'HDNG', 'HLIT', 'HRMN', 'HRMNU', 'HRMNW', 'TINY', 'HBIO', 'HCAP', 'HCAPL', 'HAS', 'HA', 'HCOM', 'HWKN', 'HWBK', 'HAYN', 'HDS', 'HIIQ', 'HCSG', 'HQY', 'HSTM', 'HWAY', 'HTLD', 'HTLF', 'HTBX', 'HSII', 'HELE', 'HMNY', 'HMTV', 'HNNA', 'HCAC', 'HCACU', 'HCACW', 'HSIC', 'HTBK', 'HFWA', 'HEOP', 'HCCI', 'MLHR', 'HRTX', 'HSKA', 'HIBB', 'SNLN', 'HPJ', 'HIHO', 'HIMX', 'HIFS', 'HSGX', 'HMNF', 'HMSY', 'HOLI', 'HOLX', 'HBCP', 'HOMB', 'HFBL', 'HMST', 'HMTA', 'HTBI', 'CETC', 'HOFT', 'HOPE', 'HFBC', 'HBNC', 'HZNP', 'HRZN', 'HDP', 'HPT', 'HPTRP', 'HMHC', 'HWCC', 'HOVNP', 'HBMD', 'HSNI', 'HTGM', 'HUBG', 'HSON', 'HDSN', 'HBAN', 'HBANN', 'HBANO', 'HBANP', 'HURC', 'HURN', 'HCM', 'HBP', 'HDRA', 'HDRAR', 'HDRAU', 'HDRAW', 'HYGS', 'IDSY', 'IAC', 'IKGH', 'IBKC', 'IBKCO', 'IBKCP', 'ICAD', 'IEP', 'ICFI', 'ICLR', 'ICON', 'ICUI', 'IPWR', 'INVE', 'IDRA', 'IDXX', 'IESC', 'IROQ', 'IRG', 'RXDX', 'INFO', 'IIVI', 'KANG', 'IKNX', 'ILMN', 'ISNS', 'IMMR', 'ICCC', 'IMDZ', 'IMNP', 'IMGN', 'IMMU', 'IPXL', 'PI', 'IMMY', 'INCR', 'SAAS', 'INCY', 'INDB', 'IBCP', 'IBTX', 'IDSA', 'INFN', 'INFI', 'IPCC', 'III', 'IFON', 'IMKTA', 'INWK', 'INNL', 'INOD', 'IPHS', 'IOSP', 'ISSC', 'INVA', 'INGN', 'ITEK', 'INOV', 'INO', 'NSIT', 'ISIG', 'INSM', 'IIIN', 'PODD', 'INSY', 'NTEC', 'IART', 'IDTI', 'INTC', 'IQNT', 'NTLA', 'IPCI', 'IPAR', 'IBKR', 'ININ', 'ICPT', 'IDCC', 'TILE', 'LINK', 'IMI', 'INAP', 'IBOC', 'ISCA', 'IGLD', 'IIJI', 'IDXG', 'XENT', 'INTX', 'ISIL', 'IILG', 'IVAC', 'INTL', 'ITCI', 'IIN', 'INTU', 'ISRG', 'INVT', 'SNAK', 'ISTR', 'ISBC', 'ITIC', 'NVIV', 'IVTY', 'IONS', 'IPAS', 'DTYS', 'DTYL', 'DTUS', 'DTUL', 'DFVS', 'DFVL', 'FLAT', 'DLBS', 'DLBL', 'STPP', 'IPGP', 'IRMD', 'IRIX', 'IRDM', 'IRDMB', 'IRBT', 'IRWD', 'IRCP', 'PMPT', 'SLQD', 'TLT', 'AIA', 'COMT', 'IXUS', 'FALN', 'IFEU', 'IFGL', 'IGF', 'GNMA', 'HYXE', 'JKI', 'ACWX', 'ACWI', 'AAXJ', 'EWZS', 'MCHI', 'ESGD', 'SCZ', 'ESGE', 'EEMA', 'EUFN', 'IEUS', 'MPCT', 'ENZL', 'QAT', 'UAE', 'IBB', 'SOXX', 'EMIF', 'ICLN', 'WOOD', 'INDY', 'ISHG', 'IGOV', 'ISLE', 'ISRL', 'ITI', 'ITRI', 'ITRN', 'ITUS', 'XXIA', 'IXYS', 'IZEA', 'JJSF', 'MAYS', 'JBHT', 'JCOM', 'JASO', 'JKHY', 'JACK', 'JXSB', 'JAGX', 'JAKK', 'JMBA', 'JRVR', 'JSML', 'JSMD', 'JASN', 'JASNW', 'JAZZ', 'JD', 'JSYN', 'JSYNR', 'JSYNU', 'JSYNW', 'JBLU', 'JTPY', 'JCTCF', 'JIVE', 'WYIG', 'WYIGU', 'WYIGW', 'JBSS', 'JOUT', 'JNP', 'JUNO', 'KTWO', 'KALU', 'KMDA', 'KNDI', 'KPTI', 'KBSF', 'KCAP', 'KRNY', 'KELYA', 'KELYB', 'KMPH', 'KFFB', 'KERX', 'KEQU', 'KTEC', 'KTCC', 'KFRC', 'KE', 'KBAL', 'KIN', 'KGJI', 'KINS', 'KONE', 'KNSL', 'KIRK', 'KITE', 'KTOV', 'KTOVW', 'KLAC', 'KLRE', 'KLREU', 'KLREW', 'KLXI', 'KONA', 'KZ', 'KOPN', 'KRNT', 'KOSS', 'KWEB', 'KTOS', 'KLIC', 'KURA', 'KVHI', 'FSTR', 'LJPC', 'LSBK', 'LSBG', 'LBAI', 'LKFN', 'LAKE', 'LRCX', 'LAMR', 'LANC', 'LCA', 'LCAHU', 'LCAHW', 'LNDC', 'LARK', 'LMRK', 'LMRKO', 'LMRKP', 'LE', 'LSTR', 'LNTH', 'LTRX', 'LSCC', 'LAWS', 'LAYN', 'LCNB', 'LBIX', 'LGCY', 'LGCYO', 'LGCYP', 'LTXB', 'DDBI', 'EDBI', 'LVHD', 'UDBI', 'LMAT', 'TREE', 'LXRX', 'LGIH', 'LHCG', 'LBRDA', 'LBRDK', 'LBTYA', 'LBTYB', 'LBTYK', 'LILA', 'LILAK', 'LVNTA', 'LVNTB', 'QVCA', 'QVCB', 'BATRA', 'BATRK', 'LMCA', 'LMCK', 'LSXMA', 'LSXMB', 'LSXMK', 'TAX', 'LTRPA', 'LTRPB', 'LPNT', 'LCUT', 'LFVN', 'LWAY', 'LGND', 'LTBR', 'LPTH', 'LLNW', 'LMNR', 'LINC', 'LECO', 'LIND', 'LINDW', 'LLTC', 'LBIO', 'LIOX', 'LPCN', 'LQDT', 'LFUS', 'LIVN', 'LOB', 'LIVE', 'LPSN', 'LKQ', 'LMFA', 'LMFAW', 'LMIA', 'LOGI', 'LOGM', 'EVAR', 'CNCR', 'LONE', 'LTEA', 'LORL', 'LOXO', 'LPTN', 'LPLA', 'LRAD', 'LYTS', 'LULU', 'LITE', 'LMNX', 'LMOS', 'LUNA', 'MBTF', 'MACQU', 'MIII', 'MIIIU', 'MIIIW', 'MBVX', 'MCBC', 'MFNC', 'MTSI', 'MCUR', 'MGNX', 'MDGL', 'MAGS', 'MGLN', 'MPET', 'MGIC', 'CALL', 'MNGA', 'MGYR', 'MHLD', 'MSFG', 'COOL', 'MMYT', 'MBUU', 'MLVF', 'MAMS', 'TUSK', 'MANH', 'LOAN', 'MNTX', 'MTEX', 'MNKD', 'MANT', 'MARA', 'MCHX', 'MARPS', 'MRNS', 'MKTX', 'MRLN', 'MAR', 'MBII', 'MRTN', 'MMLP', 'MRVL', 'MASI', 'MTCH', 'MATN', 'MTLS', 'MTRX', 'MAT', 'MATR', 'MATW', 'MXIM', 'MXPT', 'MXWL', 'MZOR', 'MBFI', 'MBFIP', 'MCFT', 'MGRC', 'MDCA', 'MFIN', 'MFINL', 'MTBC', 'MTBCP', 'MNOV', 'MDSO', 'MDGS', 'MDWD', 'MDVX', 'MDVXW', 'MEDP', 'MEET', 'MEIP', 'MPEL', 'MLNX', 'MELR', 'MEMP', 'MENT', 'MTSL', 'MELI', 'MBWM', 'MERC', 'MBVT', 'MRCY', 'EBSB', 'VIVO', 'MMSI', 'MACK', 'MSLI', 'MRUS', 'MLAB', 'MESO', 'CASH', 'MBLX', 'MEOH', 'MFRI', 'MGCD', 'MGEE', 'MGPI', 'MCHP', 'MU', 'MICT', 'MICTW', 'MSCC', 'MSFT', 'MSTR', 'MVIS', 'MPB', 'MTP', 'MCEP', 'MBRG', 'MBCN', 'MSEX', 'MSBI', 'MOFG', 'MIME', 'MDXG', 'MNDO', 'MB', 'NERV', 'MRTX', 'MIRN', 'MSON', 'MIND', 'MINDP', 'MITK', 'MITL', 'MKSI', 'MMAC', 'MINI', 'MOBL', 'MOCO', 'MDSY', 'MLNK', 'MBRX', 'MNTA', 'MOMO', 'MCRI', 'MDLZ', 'MGI', 'MPWR', 'TYPE', 'MNRO', 'MRCC', 'MNST', 'MSDI', 'MSDIW', 'MHGC', 'MORN', 'MOSY', 'MTFB', 'MPAA', 'MDM', 'MRVC', 'MSBF', 'MSG', 'MTGE', 'MTGEP', 'MTSC', 'LABL', 'MFSF', 'MYSZ', 'MYL', 'MYOK', 'MYOS', 'MYRG', 'MYGN', 'NBRV', 'NAKD', 'NNDM', 'NANO', 'NSTG', 'NH', 'NK', 'NSSC', 'NDAQ', 'NTRA', 'NATH', 'NAUH', 'NKSH', 'FIZZ', 'NCMI', 'NCOM', 'NGHC', 'NGHCN', 'NGHCO', 'NGHCP', 'NGHCZ', 'NHLD', 'NATI', 'NATL', 'NRCIA', 'NRCIB', 'NSEC', 'NWLI', 'NAII', 'NHTC', 'NATR', 'BABY', 'NAVI', 'NBTB', 'NCIT', 'NKTR', 'NEOG', 'NEO', 'NEON', 'NEOS', 'NEOT', 'NVCN', 'NEPT', 'UEPS', 'NETE', 'NTAP', 'NTES', 'NFLX', 'NTGR', 'NLST', 'NTCT', 'NTWK', 'CUR', 'NBIX', 'NDRM', 'NURO', 'NUROW', 'NYMT', 'NYMTO', 'NYMTP', 'NLNK', 'NWS', 'NWSA', 'NEWS', 'NEWT', 'NEWTL', 'NEWTZ', 'NXEO', 'NXEOU', 'NXEOW', 'NXST', 'NVET', 'NFEC', 'EGOV', 'NICE', 'NICK', 'NCBS', 'NIHD', 'NVLS', 'NMIH', 'NNBR', 'NDLS', 'NDSN', 'NSYS', 'NBN', 'NTIC', 'NTRS', 'NTRSP', 'NFBK', 'NRIM', 'NWBI', 'NWBO', 'NWBOW', 'NWPX', 'NCLH', 'NWFL', 'NVFY', 'NVMI', 'NVDQ', 'NOVN', 'NOVT', 'MIFI', 'NVAX', 'NVCR', 'NVGN', 'NUAN', 'NMRX', 'NTNX', 'NUTR', 'NTRI', 'NUVA', 'NVTR', 'QQQX', 'NVEE', 'NVEC', 'NVDA', 'NXPI', 'NXTM', 'NXTD', 'NXTDW', 'NYMX', 'OIIM', 'OVLY', 'OASM', 'OBLN', 'OBCI', 'OPTT', 'ORIG', 'OSHC', 'OCFC', 'OCRX', 'OCLR', 'OFED', 'OCUL', 'OCLS', 'OCLSW', 'OMEX', 'ODP', 'OFS', 'OHAI', 'OVBC', 'OHRP', 'ODFL', 'OLBK', 'ONB', 'OPOF', 'OSBC', 'OSBCP', 'OLLI', 'ZEUS', 'OFLX', 'OMER', 'OMCL', 'ON', 'OTIV', 'ONS', 'ONSIW', 'ONSIZ', 'OGXI', 'OMED', 'ONTX', 'ONTXW', 'ONCS', 'OHGI', 'ONVI', 'OTEX', 'OPXA', 'OPXAW', 'OPGN', 'OPGNW', 'OPHT', 'OPK', 'OBAS', 'OCC', 'OPHC', 'OPB', 'ORMP', 'OSUR', 'ORBC', 'ORBK', 'ORLY', 'OREX', 'ONVO', 'SEED', 'OACQ', 'OACQR', 'OACQU', 'OACQW', 'OESX', 'ORIT', 'ORRF', 'OFIX', 'OSIS', 'OSIR', 'OSN', 'OTEL', 'OTIC', 'OTTW', 'OTTR', 'OVAS', 'OSTK', 'OXBR', 'OXBRW', 'OXFD', 'OXLC', 'OXLCN', 'OXLCO', 'PFIN', 'PTSI', 'PCAR', 'PACE', 'PACEU', 'PACEW', 'PACB', 'PCBK', 'PEIX', 'PMBC', 'PPBI', 'PAAC', 'PAACR', 'PAACU', 'PAACW', 'PCRX', 'PACW', 'PTIE', 'PAAS', 'PNRA', 'PANL', 'PZZA', 'FRSH', 'PBNC', 'PRTK', 'PRXL', 'PCYG', 'PSTB', 'PKBK', 'PRKR', 'PKOH', 'PARN', 'PTNR', 'PBHC', 'PATK', 'PNBK', 'PATI', 'PEGI', 'PDCO', 'PTEN', 'PAVM', 'PAVMW', 'PAYX', 'PCTY', 'PYDS', 'PYPL', 'PBBI', 'CNXN', 'PCMI', 'PCTI', 'PDCE', 'PDFS', 'PDLI', 'PDVW', 'SKIS', 'PGC', 'PEGA', 'PCO', 'PENN', 'PFLT', 'PNNT', 'PWOD', 'PTXP', 'PEBO', 'PEBK', 'PFBX', 'PFIS', 'PBCT', 'PUB', 'PRCP', 'PPHM', 'PPHMP', 'PRFT', 'PFMT', 'PERF', 'PERI', 'PESI', 'PTX', 'PERY', 'PGLC', 'PETS', 'PFSW', 'PGTI', 'PZRX', 'PHII', 'PHIIK', 'PAHC', 'PHMD', 'PLAB', 'PICO', 'PIRS', 'PPC', 'PME', 'PNK', 'PNFP', 'PPSI', 'PXLW', 'PLPM', 'PLXS', 'PLUG', 'PLBC', 'PSTI', 'PBSK', 'PNTR', 'PCOM', 'POOL', 'POPE', 'PLKI', 'BPOP', 'BPOPM', 'BPOPN', 'PBIB', 'PTLA', 'PBPB', 'PCH', 'POWL', 'POWI', 'PSIX', 'PDBC', 'DWLV', 'DWIN', 'DWTR', 'IDLB', 'PRFZ', 'PAGG', 'PSAU', 'IPKW', 'LDRI', 'LALT', 'PNQI', 'QQQ', 'USLB', 'PSCD', 'PSCC', 'PSCE', 'PSCF', 'PSCH', 'PSCI', 'PSCT', 'PSCM', 'PSCU', 'VRIG', 'PRAA', 'PRAH', 'PRAN', 'PFBC', 'PLPC', 'PFBI', 'PINC', 'LENS', 'PRGX', 'PSMT', 'PBMD', 'PNRG', 'PRMW', 'PRIM', 'BTEC', 'GENY', 'PSET', 'PY', 'PSC', 'PRZM', 'PVTB', 'PVTBP', 'PDEX', 'IPDN', 'PFIE', 'PGNX', 'PRGS', 'DNAI', 'PFPT', 'PRPH', 'PRQR', 'BIB', 'UBIO', 'TQQQ', 'ZBIO', 'SQQQ', 'BIS', 'PSEC', 'PTGX', 'PRTO', 'PTI', 'PRTA', 'PWX', 'PVBC', 'PROV', 'PBIP', 'PSDV', 'PMD', 'PTC', 'PTCT', 'PULM', 'PLSE', 'PCYO', 'IMED', 'FINQ', 'PXS', 'QADA', 'QADB', 'QCRH', 'QGEN', 'QIWI', 'QLTI', 'QRVO', 'QCOM', 'QSII', 'QBAK', 'QLYS', 'QRHC', 'QUIK', 'QDEL', 'QPAC', 'QPACU', 'QPACW', 'QNST', 'QUMU', 'QUNR', 'QTNT', 'RRD', 'RADA', 'RDCM', 'ROIA', 'ROIAK', 'RSYS', 'RDUS', 'RDNT', 'RDWR', 'RMBS', 'RAND', 'RLOG', 'GOLD', 'RNDB', 'RPD', 'RPTP', 'RAVE', 'RAVN', 'ROLL', 'TALL', 'RICK', 'RCMT', 'RDI', 'RDIB', 'RGSE', 'RELY', 'RNWK', 'RP', 'RETA', 'UTES', 'DAX', 'QYLD', 'RCON', 'REPH', 'RRGB', 'RRR', 'RDHL', 'REGN', 'RGNX', 'RGLS', 'REIS', 'RELV', 'MARK', 'RNST', 'REGI', 'RNVA', 'RNVAZ', 'RCII', 'RTK', 'RGEN', 'RPRX', 'RBCAA', 'FRBK', 'REFR', 'RESN', 'RECN', 'ROIC', 'SALE', 'RTRX', 'RVNC', 'RVEN', 'RVLT', 'RWLK', 'REXX', 'RFIL', 'RGCO', 'RIBT', 'RIBTW', 'RELL', 'RIGL', 'NAME', 'RNET', 'RTTR', 'RVSB', 'RLJE', 'RMGN', 'ROBO', 'FUEL', 'RMTI', 'RCKY', 'RMCF', 'RSTI', 'ROKA', 'ROSG', 'ROST', 'RBPAA', 'RGLD', 'RPXC', 'RTIX', 'RBCN', 'RUSHA', 'RUSHB', 'RUTH', 'RXII', 'RYAAY', 'STBA', 'SANW', 'SCACU', 'SBRA', 'SBRAP', 'SABR', 'SAEX', 'SAFT', 'SAGE', 'SAIA', 'SAJA', 'SALM', 'SAL', 'SAFM', 'SASR', 'SGMO', 'SANM', 'GCVRZ', 'SPNS', 'SRPT', 'SBFG', 'SBFGP', 'SBAC', 'SCSC', 'SMIT', 'SCHN', 'SCHL', 'SCLN', 'SGMS', 'SNI', 'SCYX', 'SEAC', 'SBCF', 'STX', 'SHIP', 'SRSC', 'SHLD', 'SHLDW', 'SHOS', 'SPNE', 'SGEN', 'EYES', 'SCWX', 'SNFCA', 'SEIC', 'SLCT', 'SCSS', 'SIR', 'SELB', 'SIGI', 'LEDS', 'SMTC', 'SENEA', 'SENEB', 'SNH', 'SNHNI', 'SNHNL', 'SNMX', 'SRTS', 'SRTSW', 'SQBG', 'MCRB', 'SREV', 'SFBS', 'SEV', 'SVBI', 'SGOC', 'SMED', 'SHSP', 'SHEN', 'SHLO', 'TYHT', 'SHPG', 'SCVL', 'SHBI', 'SHOR', 'SFLY', 'SIFI', 'SIEB', 'SIEN', 'BSRR', 'SWIR', 'SIFY', 'SIGM', 'SGMA', 'SGNL', 'SBNY', 'SBNYW', 'SLGN', 'SILC', 'SGI', 'SLAB', 'SIMO', 'SPIL', 'SSRI', 'SAMG', 'SFNC', 'SLP', 'SINA', 'SBGI', 'SINO', 'SVA', 'SIRI', 'SITO', 'SKYS', 'SKLN', 'MOBI', 'SPU', 'SKYW', 'SWKS', 'ISM', 'JSM', 'OSM', 'SLM', 'SLMAP', 'SLMBP', 'SMBK', 'SWHC', 'SMSI', 'SMTX', 'LNCE', 'SRAX', 'SCKT', 'SODA', 'SOHU', 'SLRC', 'SUNS', 'SCTY', 'SEDG', 'SONC', 'SOFO', 'SONS', 'SPHS', 'SORL', 'SRNE', 'SOHO', 'SOHOB', 'SOHOM', 'SFBC', 'SSB', 'SFST', 'SMBC', 'SONA', 'SBSI', 'OKSB', 'SP', 'SPAN', 'SBSA', 'SGRP', 'SPKE', 'ONCE', 'SPAR', 'SPTN', 'DWFI', 'SPPI', 'ANY', 'SPEX', 'SPI', 'SAVE', 'SPLK', 'SPOK', 'SPWH', 'SBPH', 'FUND', 'SFM', 'SPSC', 'SSNC', 'STAA', 'STAF', 'STMP', 'STLY', 'SPLS', 'SBLK', 'SBLKL', 'SBUX', 'STRZA', 'STRZB', 'STFC', 'STBZ', 'SNC', 'STDY', 'GASS', 'STLD', 'SMRT', 'STLR', 'STLRU', 'STLRW', 'SBOT', 'STEM', 'STML', 'SRCL', 'SRCLP', 'STRL', 'SHOO', 'SSFN', 'SYBT', 'BANX', 'SGBK', 'SSKN', 'SSYS', 'STRT', 'STRS', 'STRA', 'STRM', 'SBBP', 'STB', 'SCMP', 'SUMR', 'SMMF', 'SSBI', 'SMMT', 'SNBC', 'SNHY', 'SNDE', 'SEMI', 'SNSS', 'STKL', 'SPWR', 'RUN', 'SBCP', 'SSH', 'SUNW', 'SMCI', 'SPCB', 'SCON', 'SGC', 'SUPN', 'SPRT', 'SGRY', 'SCAI', 'SRDX', 'SBBX', 'SIVB', 'SIVBO', 'SYKE', 'SYMC', 'SYNC', 'SYNL', 'SYNA', 'SNCR', 'SNDX', 'SGYP', 'SGYPU', 'SGYPW', 'ELOS', 'SNPS', 'SYNT', 'SYMX', 'SYUT', 'SYPR', 'SYRS', 'SYRX', 'TROW', 'TTOO', 'TRHC', 'TCMD', 'TAIT', 'TTWO', 'TLND', 'TNDM', 'TLF', 'TNGO', 'TANH', 'TEDU', 'TASR', 'TATT', 'TAYD', 'TCPC', 'AMTD', 'TEAR', 'TECD', 'TCCO', 'TTGT', 'TGLS', 'TGEN', 'TNAV', 'TTEC', 'TLGT', 'TENX', 'GLBL', 'TERP', 'TRTL', 'TRTLU', 'TRTLW', 'TVIA', 'TBNK', 'TSRO', 'TESO', 'TSLA', 'TESS', 'TSRA', 'TTEK', 'TLOG', 'TTPH', 'TCBI', 'TCBIL', 'TCBIP', 'TCBIW', 'TXN', 'TXRH', 'TFSL', 'TGTX', 'ABCO', 'ANDE', 'TBBK', 'BONT', 'CG', 'CAKE', 'CHEF', 'TCFC', 'DSGX', 'DXYN', 'ENSG', 'XONE', 'FINL', 'FBMS', 'FLIC', 'GT', 'HABT', 'HCKT', 'HAIN', 'FITS', 'CUBA', 'INTG', 'JYNT', 'KEYW', 'KHC', 'OLD', 'MDCO', 'MIK', 'MIDD', 'NAVG', 'SLIM', 'STKS', 'ORG', 'PCLN', 'PRSC', 'BITE', 'RMR', 'SPNC', 'TTD', 'ULTI', 'YORW', 'NCTY', 'TBPH', 'TST', 'TCRD', 'THLD', 'TICC', 'TTS', 'TIL', 'TSBK', 'TIPT', 'TITN', 'TTNP', 'TIVO', 'TMUS', 'TMUSP', 'TBRA', 'TKAI', 'TNXP', 'TISA', 'TOPS', 'TORM', 'TRCH', 'TSEM', 'TWER', 'CLUB', 'TOWN', 'TPIC', 'TCON', 'TSCO', 'TWMC', 'TACT', 'TRNS', 'TBIO', 'TGA', 'TA', 'TANNI', 'TANNL', 'TANNZ', 'TZOO', 'TRVN', 'TCBK', 'TRIL', 'TRS', 'TRMB', 'TRIB', 'TRIP', 'TSC', 'TBK', 'TRNC', 'TROV', 'TROVU', 'TROVW', 'TRUE', 'THST', 'TRUP', 'TRST', 'TRMK', 'TSRI', 'TTMI', 'TUBE', 'TCX', 'TUES', 'TOUR', 'HEAR', 'TUTI', 'TUTT', 'FOX', 'FOXA', 'TWIN', 'TRCB', 'USCR', 'PRTS', 'USEG', 'GROW', 'UBNT', 'UFPT', 'ULTA', 'UCTT', 'RARE', 'ULBI', 'ULTR', 'UTEK', 'UMBF', 'UMPQ', 'UNAM', 'UNIS', 'UBSH', 'UNB', 'UNXL', 'QURE', 'UBCP', 'UBOH', 'UBSI', 'UCBA', 'UCBI', 'UCFC', 'UDF', 'UBNK', 'UFCS', 'UIHC', 'UNFI', 'UBFO', 'USLM', 'UTHR', 'UG', 'UNTY', 'OLED', 'UEIC', 'UFPI', 'ULH', 'USAP', 'UVSP', 'UPLD', 'URRE', 'URBN', 'ECOL', 'USAT', 'USATP', 'USAK', 'UTMD', 'UTSI', 'VALX', 'VALU', 'VNDA', 'BBH', 'GNRX', 'PPH', 'VWOB', 'VNQI', 'VGIT', 'VCIT', 'VIGI', 'VYMI', 'VCLT', 'VGLT', 'VMBS', 'VNR', 'VNRAP', 'VNRBP', 'VNRCP', 'VONE', 'VONG', 'VONV', 'VTWO', 'VTWG', 'VTWV', 'VTHR', 'VCSH', 'VGSH', 'VTIP', 'BNDX', 'VXUS', 'VRNS', 'VDSI', 'VBLT', 'VASC', 'VBIV', 'WOOF', 'VECO', 'DGLD', 'DSLV', 'UGLD', 'USLV', 'TVIZ', 'TVIX', 'ZIV', 'XIV', 'VIIZ', 'VIIX', 'APPY', 'VRA', 'VCYT', 'VSTM', 'VCEL', 'VRNT', 'VRSN', 'VRSK', 'VBTX', 'VRML', 'VSAR', 'VTNR', 'VRTX', 'VRTB', 'VIA', 'VIAB', 'VSAT', 'VIAV', 'VICL', 'VICR', 'CIZ', 'CEZ', 'CID', 'CIL', 'CFO', 'CFA', 'CSF', 'CDC', 'CDL', 'CSB', 'CSA', 'VBND', 'VUSE', 'VIDI', 'VDTH', 'VRAY', 'VKTX', 'VKTXW', 'VBFC', 'VLGEA', 'VIP', 'VNOM', 'VIRC', 'VA', 'VIRT', 'VRTS', 'VRTU', 'VISN', 'VTGN', 'VTAE', 'VTL', 'VIVE', 'VVUS', 'VOD', 'VLTC', 'VOXX', 'VYGR', 'VSEC', 'VTVT', 'VUZI', 'VWR', 'WGBS', 'WBA', 'WAFD', 'WAFDW', 'WASH', 'WFBI', 'WSBF', 'WVE', 'WAYN', 'WSTG', 'WCFB', 'WDFC', 'FLAG', 'WEB', 'WBMD', 'WB', 'WEBK', 'WEN', 'WERN', 'WSBC', 'WTBA', 'WSTC', 'WMAR', 'WABC', 'WBB', 'WSTL', 'WDC', 'WFD', 'WLB', 'WPRT', 'WEYS', 'WHLR', 'WHLRD', 'WHLRP', 'WHLRW', 'WHF', 'WHFBL', 'WFM', 'WILN', 'WHLM', 'WVVI', 'WVVIP', 'WLDN', 'WLFC', 'WLTW', 'WIN', 'WINT', 'WING', 'WINA', 'WINS', 'WTFC', 'WTFCM', 'WTFCW', 'AGND', 'AGZD', 'HYND', 'HYZD', 'CXSE', 'EMCG', 'EMCB', 'DGRE', 'DXGE', 'WETF', 'DXJS', 'DXKW', 'GULF', 'CRDT', 'DGRW', 'DGRS', 'DXPS', 'UBND', 'WIX', 'WMIH', 'WBKC', 'WWD', 'WKHS', 'WRLD', 'JMU', 'WPCS', 'WPPGY', 'WMGI', 'WMGIZ', 'WSFS', 'WSFSL', 'WSCI', 'WVFC', 'WYNN', 'XBIT', 'XELB', 'XCRA', 'XNCR', 'XBKS', 'XENE', 'XGTI', 'XGTIW', 'XLNX', 'XOMA', 'XPLR', 'XCOM', 'XTLB', 'XNET', 'YHOO', 'YNDX', 'YIN', 'YOD', 'YRCW', 'YECO', 'YY', 'ZFGN', 'ZAGG', 'ZAIS', 'ZBRA', 'ZLTQ', 'Z', 'ZG', 'ZN', 'ZNWAA', 'ZION', 'ZIONW', 'ZIONZ', 'ZIOP', 'ZIXI', 'ZGNX', 'ZSAN', 'ZUMZ', 'ZYNE', 'ZNGA'];

var nYearsAgo = 1;

//var nStartIndexRequested = -1;
//var arFromDateDiffToIndex = null;
//var arFromIndexToDate = null;
//var bInsertionsNeeded = false;

/*
$(document).ready(function () {
    //your code here
    document.getElementById("snap").addEventListener("click", function () {
        getStock({ stock: 'AAPL', startDate: '2013-01-01', endDate: '2013-01-05' }, 'historicaldata', function (err, data) {
            console.log(data);
          //  alert(data.quote[1]["Close"]);       
    //        var msg = $.ajax({ type: "GET", url: "my_script.php", async: false }).responseText;
        });
    //    var txt = document.getElementById("firstname");
    //    txt.style['width'] = '4px';
    //    alert("By");
    });

});
(function($) {
    function getStock(opts, type, complete) {
        var defs = {
            desc: false,
            baseURL: 'http://query.yahooapis.com/v1/public/yql?q=',
          //  baseURL: 'http://query.googleapis.com/v1/public/yql?q=',
            query: {
                quotes: 'select * from yahoo.finance.quotes where symbol = "{stock}" | sort(field="{sortBy}", descending="{desc}")',
               // quotes: 'select * from google.finance.quotes where symbol = "{stock}" | sort(field="{sortBy}", descending="{desc}")',
                historicaldata: 'select * from yahoo.finance.historicaldata where symbol = "{stock}" and startDate = "{startDate}" and endDate = "{endDate}"'
               // historicaldata: 'select * from google.finance.historicaldata where symbol = "{stock}" and startDate = "{startDate}" and endDate = "{endDate}"'
            },
            suffixURL: {
                quotes: '&env=store://datatables.org/alltableswithkeys&format=json&callback=?',
                historicaldata: '&env=store://datatables.org/alltableswithkeys&format=json&callback=?'
            }
        };

        opts = opts || {};

        if (!opts.stock) {
            complete('No stock defined');
            return;
        }

        var query = defs.query[type]
        .replace('{stock}', opts.stock)
        .replace('{sortBy}', defs.sortBy)
        .replace('{desc}', defs.desc)
        .replace('{startDate}', opts.startDate)
        .replace('{endDate}', opts.endDate)

        var url = defs.baseURL + query + (defs.suffixURL[type] || '');
        $.getJSON(url, function(data) {
            var err = null;
            if (!data || !data.query) {
                err = true;
            }
            complete(err, !err && data.query.results);    });
    }
    window.getStock = getStock;
})(jQuery);
/////////////////////////////////////////
*/
function findHiddenSymbols() {
    

    var arHiddenSymbols = [];

    if (arFormulasChain != null) {
        for (var n = 0; n < arFunctionNames.length; n++) {
//alert("arFormulasChain.length=" + arFormulasChain.length + " arFormulasChain=" + arFormulasChain);
            for (var i = 0; i < arFormulasChain.length; i++) {
//alert("1. i=" + i);
                        var sFormula = eatSpaces(arFormulasChain[i]);
//alert("sFormula=" + sFormula);

                        var pos1 = sFormula.indexOf(arFunctionNames[n]);
        //alert("out: pos1=" + pos1);
                        while (pos1 >= 0) {
  //      alert("in: pos1=" + pos1);
                            var pos2 = sFormula.indexOf("(", pos1);
                                                            //var pos3 = sFormula.indexOf(",", pos2);
                                                            var pos3 = sFormula.indexOf(")", pos2);
                            var sIn=sFormula.substring(pos2+1, pos3);
      //  alert("data: "+pos2+" "+pos3+" "+sIn);
                            if (sIn[0] == 'T' || sIn[0] == 't') {// symbols can be stores only in input tables, not calculated ones
                                //   alert("1. sIn=" + sIn);
                                sIn = sIn.substr(1);
                                //     alert("2. sIn=" + sIn);


                                var nIn = 1 * sIn;
                                var matrixRowsCols = matrix(nIn);
                                var B = matrixRowsCols[0];
       // alert("B=" + B);
                                var names = [1];
                                for (var r = 0; r < B.length; r++) {
                                    names.push(B[r][0]);
                                    //  weights.push(B[r][1]);
                                }
                                for (var k = 1; k < names.length; k++) {
                                    if (arHiddenSymbols.indexOf(names[k]) < 0) {
                                        arHiddenSymbols.push(names[k]);


 // alert("k=" + k + " names[k]=" + names[k]);


                                    }
                                }
                            }//else break;
                            pos1 = sFormula.indexOf(arFunctionNames[n], pos3);
        //alert("pos1=" + pos1);
                        }
//alert("2. i=" + i);
                // i cycle
             }
            //// n  cycle
        }
        
    }

//alert("returning arHiddenSymbols=" + arHiddenSymbols);
    return arHiddenSymbols;
}
function getData() {
//alert("startGetData. arFromSymbolListToAvailableIndex=" + arFromSymbolListToAvailableIndex);
//alert("V: a.bWikiFeed=" + bWikiFeed + "bGoogleFeed=" + bGoogleFeed);

    if (arSymbolList == null) arSymbolList = [];
    if (arParallelList == null) arParallelList = [];
    ////////////////////////////////////////////////
//alert("0.getData");
    // nPushedSymbols = 0;
    var arHiddenList = findHiddenSymbols();
//alert("arHiddenList=" + arHiddenList);
    // eat spaces from arSymbolList and from arParallelList
  //  eat();
    eatSpacesFromArray(arSymbolList);
    eatSpacesFromArray(arParallelList);
 //   eatSpacesFromArray(arHiddenList);
    if (arAvailableStiocks == null) arAvailableStiocks = [];
    if (arAvailableStiocksDaily == null) arAvailableStiocksDaily = [];
    if (arAvailableStiocksCanned == null) arAvailableStiocksCanned = [];
//alert("getData: sFrequencyRange=" + sFrequencyRange);
  //  if (sFrequencyRange == "daily")  arAvailableStiocks=arAvailableStiocksDaily;
   // if (sFrequencyRange == "canned") arAvailableStiocks  = arAvailableStiocksCanned;


    // List of all needed stocks
//alert("arAvailableStiocks.length=" + arAvailableStiocks.length);
//show("arSymbolList", arSymbolList);
    //show("arParallelList", arParallelList);

 //   var fruits = ["Banana", "Orange", "Apple", "Mango"];
 //   var a = fruits.indexOf("Apple");


    arBothSymbolList = new Array();
    for (var i = 0; i < arSymbolList.length; i++) {     
        var SYMB = arSymbolList[i].toUpperCase();
        if (arBothSymbolList.indexOf(SYMB) < 0) {
            arBothSymbolList.push(SYMB);
        }
        //arBothSymbolList.push(arSymbolList[i].toUpperCase());
    }
    for (var i = 0; i < arParallelList.length; i++) {
        var SYMB = arParallelList[i].toUpperCase();
        if (arBothSymbolList.indexOf(SYMB) < 0) {
            arBothSymbolList.push(SYMB);
        }
        //arBothSymbolList.push(arParallelList[i].toUpperCase());
    }
    for (var i = 0; i < arHiddenList.length; i++) {
        var SYMB = arHiddenList[i].toUpperCase();
        if (arBothSymbolList.indexOf(SYMB) < 0) {
            arBothSymbolList.push(SYMB);
        }
       // arBothSymbolList.push(arHiddenList[i].toUpperCase());
    }

//alert("arBothSymbolList=" + arBothSymbolList);

    if (arFromSymbolListToAvailableIndex == null) arFromSymbolListToAvailableIndex = [];
   // arFromSymbolListToAvailableIndex = new Array();
    arFromParallelListToAvailableIndex = new Array();


    // add stock which are still unavailable
//alert("before addStocksToArAvailableStiocks");
    var nStocksAdded = addStocksToArAvailableStiocks();// main line!!!!!!!!!!!!!!!!!!!!!!!!
//alert("after addStocksToArAvailableStiocks");
//if (bWikiFeed) addCurrentPrices();
    if (!bBusy && nTestedFromBothSymbolList == arBothSymbolList.length) {
      //  
        if (nStocksAdded == 0) {
            Calculate("no stocks were added: (do nothing? )");

        }
        else 
        {
            if (!bInsideOfOnLoad && arHiddenList.length == 0) {
                Calculate("22. some stocks were added to available( Recalculate?");
            }
          //  else return;//without calculations (there is a hidden list)//9/7/2017
        
        }
    }
    else{// if (bBusy) 
       //    arStock = [[], [], [], [], [], [], []];
       //    arStock[0][0] = sStock.toUpperCase();
     //      myDrawingFunction();
        sWait = "Wait, please.";
        myVar = setInterval(myTimer ,1000);  //////////////////////
    }
    /*
alert("1. endGetData. arFromSymbolListToAvailableIndex=" + arFromSymbolListToAvailableIndex);
    for (var i = 0; i < arSymbolList.length; i++) {
        arFromSymbolListToAvailableIndex[i] = findNameInAvailableArray(arSymbolList[i]);////1/11/2018
    }
alert("2. endGetData. arFromSymbolListToAvailableIndex=" + arFromSymbolListToAvailableIndex);
*/
}
function myTimer() {
    myDrawingFunction();//???

   // var d = new Date();
    sWait+=".";
    ctx.font = "20px Georgia";
    ctx.fillStyle = 'red';
    ctx.fillText(sWait, 10, 50);
    // ctx.fillText("Wait , please:" + d.toLocaleTimeString(), 10, 50);


    if (!bBusy && nTestedFromBothSymbolList == arBothSymbolList.length){
        clearInterval(myVar);
        sWait = "";
        myDrawingFunction();
    }
    if (sWait.length > 30) {

        clearInterval(myVar);
        sWait = "";
        myDrawingFunction();
    }
}
function addStocksToArAvailableStiocks() {//sStock is a name
//    alert("arBothSymbolList.length=" + arBothSymbolList.length);
    if (arBothSymbolList.length == 0) return 0;//not financial stuf

    // if sStock already available go ahead with the next one ;
    nTestedFromBothSymbolList = 0;


    var sStock = nextUnavailableStock();

//alert("addStocksToArAvailableStiocks=" + sStock);

//alert("1. nTestedFromBothSymbolList=" + nTestedFromBothSymbolList + " sStock=" + sStock);

    if (sStock == "") return 0;// nothing to add (all are available)

    //alert("bWikiFeed=" + bWikiFeed + "bGoogleFeed=" + bGoogleFeed);

    //request (reccurently)
    if (bWikiFeed) {
        sStock = sStock.toUpperCase();
//alert("sStock=" + sStock);
        

        var sStockSYMBOL = sStock;
        var sStockSymbol = sStock.toLowerCase();
   /*     var nT = sStockSymbol.substring(1);
//alert("sStockSYMBOL[0]="+sStockSYMBOL[0]+" nT="+nT);
        if (sStockSYMBOL[0] == 'T' && !isNaN(nT)) {
            arStock = getArraysOfDataW(null, sStock);
        }
        else*/     //  9/9/2017
        {
//alert("quandle");
       //     $.get("https://www.quandl.com/api/v3/datasets/WIKI/" + sStock + ".csv")
            $.get("https://www.quandl.com/api/v3/datasets/WIKI/" + sStock + ".csv?rows=250250")
             /*     .done(
                function (data) {
  alert("1. data=" + data);
                    arStock = getArraysOfDataW(data, sStock);
                }
                );*/
          .always(function (data) {
              //alert("1.always. sStock=" + sStock);
             // alert("1.always. data=" + data);

              var s = data.length;
//alert("data.length=" + data.length+ " data="+data);
                 if (s == undefined) {

                   //   arStock = [[], [], [], [], [], [], []];
                     //    arStock[0][0] = sStock.toUpperCase();
                     data = "";
                      arStock = getArraysOfDataW(data, sStock);
                  }
                  else 
                      if (data != null)  {
                    arStock = getArraysOfDataW(data, sStock);
                }
            });
        }


    }
    else //if (bGoogleFeed)
    {
      //  alert("addStocks: canned")
        getArraysOfDataG(sStock);
    }
/*    else {
        getStock(prepareArStock(sStock),'historicaldata',
           function (err, data) {
               getArraysOfData1(err, data);
           });
    }*/


  //  return nTestedFromBothSymbolList;
}
function nextUnavailableStock() {
 //  alert("1. arFromSymbolListToAvailableIndex=" + arFromSymbolListToAvailableIndex);
   // alert("nextUnavailableStock: arBothSymbolList=" + arBothSymbolList);
    var sStock = "";
    while (nTestedFromBothSymbolList < arBothSymbolList.length) {
        sStock = arBothSymbolList[nTestedFromBothSymbolList].toUpperCase();

        ///////
        var sStockSYMBOL = sStock.toUpperCase();
        var sStockSymbol = sStock.toLowerCase();
        var nT = sStockSymbol.substring(1);
        //////

//alert(" nextUnavailableStock=" + sStock);
        if (sStock != "")
        {
            var index = findNameInAvailableArray(sStock);
//alert("index=" + index);
            if (index < 0) {
                break;
            }
         /*   else if (sStockSYMBOL[0] == 'T' && !isNaN(nT)) {//t0      break;     }*/    //9/9/2017
            else
            {//available
                if (nTestedFromBothSymbolList < arSymbolList.length) {
                   // if (sStock != "")///9/2018
                    arFromSymbolListToAvailableIndex[nTestedFromBothSymbolList] = index;
                }
                else if (nTestedFromBothSymbolList - arSymbolList.length < arParallelList.length) {
                    arFromParallelListToAvailableIndex[nTestedFromBothSymbolList - arSymbolList.length] = index;
                }
                sStock = "";
            }
        }
        nTestedFromBothSymbolList++;
    }
//    alert("arAvailableStiocks.length=" + arAvailableStiocks.length);
//    show(sStock+ ": arFromSymbolListToAvailableIndex", arFromSymbolListToAvailableIndex);
    //    show(sStock + ": arFromParallelListToAvailableIndex", arFromParallelListToAvailableIndex);
/*
    if (arFromSymbolListToAvailableIndex != null) {
        var newAr = [];
        for (var i = 0; i < arFromSymbolListToAvailableIndex.length; i++) {
            //alert("i. arFromSymbolListToAvailableIndex[i]=" + arFromSymbolListToAvailableIndex[i]);
            if (arFromSymbolListToAvailableIndex[i] != undefined) newAr.push(arFromSymbolListToAvailableIndex[i]);
        }
        alert("newAr=" + newAr);
        arFromSymbolListToAvailableIndex.length = 0;
        for (var i = 0; i < newAr.length; i++) {
            arFromSymbolListToAvailableIndex.push(newAr[i]);
        } 
    }
*/


  //  alert("2. arFromSymbolListToAvailableIndex=" + arFromSymbolListToAvailableIndex);
    return sStock;
}
/*
function prepareArStock(sStock) {
    arStock = new Array();//[[name],[arDate],[arOpen],ar[High],[arLow],[arClose],[arVolume]]
    for (var i = 0; i < 6; i++) {//date,open,high, low, close,volume
        var ar = new Array();
        arStock.push(ar);
    }
    arStock[0][0] = sStock;//name
    var v1 = new Object();
    v1.stock = sStock;
    sStartDate=getDateNYearsAgo(nYearsAgo)
    v1.startDate = sStartDate;
    v1.endDate = getDateNYearsAgo(0);

  //  nStartIndexRequested = indexFromDate(sStartDate);
    return v1;
}
*/
/*
function getDateNYearsAgo(N) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear() - N;
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return  yyyy + '-' + mm + '-' + dd;
}
*/
/*
function indexFromDate(sDate) {
    var ymd = sDate.split("-");
    return ymd[0] * 366 + ymd[1] * 31 + ymd[2] * 1;
}
*/
/*
function getArraysOfData1Old(err, data) {

   // getArraysOfData2(err, data);

    if (arFromDateDiffToIndex == null) {
        arFromDateDiffToIndex = new Array(nYearsAgo * 366);
arFromIndexToDate = new Array(nYearsAgo * 366);
        for (var i = 0; i < arFromDateDiffToIndex.length; i++) arFromDateDiffToIndex[i] = -1;
for (var i = 0; i < arFromIndexToDate.length; i++) arFromIndexToDate[i] = "yyyy-mm-dd";
    }

    var N = data.quote.length;
    var startDate = data.quote[N - 1]["Date"];
    var startIndex= indexFromDate(startDate);

    for (var i = 0; i < N; i++) {
        var di = data.quote[N-1-i];
        var sDate = di["Date"];
        var index = indexFromDate(sDate);
        if (arAvailableStiocks.length > 0 && arFromDateDiffToIndex[index - startIndex] == -1 && startIndex >= startIndexRequested) {//startUp
            bInsertionsNeeded = true;
            alert("InsertionsNeeded");
        }
        arFromDateDiffToIndex[index - startIndex] = i;
arFromIndexToDate[i] = sDate;
        arStock[1].push(di["Date"]);
        arStock[2].push(di["Open"]);
        arStock[3].push(di["High"]);
        arStock[4].push(di["Low"]);
        arStock[5].push(di["Close"]);
        arStock[6].push(di["Volume"]);
    }
//show("arFromDateDiffToIndex", arFromDateDiffToIndex);
//alert("2. Name: " + arStock[0][0] + " arStock[1].length=" + arStock[1].length);
  //  show("arFromIndexToDate", arFromIndexToDate);

 
    var indexAvailable=arAvailableStiocks.length;
    var index = nTestedFromBothSymbolList - arSymbolList.length;
//alert("nTestedFromBothSymbolList=" + nTestedFromBothSymbolList + " index=" + index + " indexAvailable=" + indexAvailable);// 0 -2 0; // 1 -1 1
   
    if (index < 0) {
        arFromSymbolListToAvailableIndex[nTestedFromBothSymbolList] = indexAvailable;//0->0 //1->1
        arAvailableStiocks.push(arStock);
    }
    else if (index+1 < arParallelList.length) {
        arFromParallelListToAvailableIndex[index+1] = indexAvailable;
        arAvailableStiocks.push(arStock);
    }
    
    if (bShowDlg == true && sSymbolFormula == "symbol" && nForDlg < arFromSymbolListToAvailableIndex.length) {// if the use was very fast
        var iAvlbl = arFromSymbolListToAvailableIndex[nForDlg];
        var s = showStockData(arAvailableStiocks[iAvlbl]);
        //alert(s);
        document.getElementById("txtSymbFormula" + nForDlg).value = s;// Symbol #" + n;
    }

    nTestedFromBothSymbolList++;
    var sStock = nextUnavailableStock();

    if (sStock == "") {
  //      show("4. arFromSymbolListToAvailableIndex", arFromSymbolListToAvailableIndex);
 //       show("4. arFromParallelListToAvailableIndex", arFromParallelListToAvailableIndex);
       // Calculate("1. some stocks were added to available( Recalculate?");
    }
    else {
 //       show("5. arFromSymbolListToAvailableIndex", arFromSymbolListToAvailableIndex);
  //      show("5. arFromParallelListToAvailableIndex", arFromParallelListToAvailableIndex);
        getStock(prepareArStock(sStock), 'historicaldata', function (err, data) { getArraysOfData1(err, data); });//or getArraysOfData2 ????/
    }

}
*/
/*
function showStockData(arStock) {
    var s = arStock[0][0] + " (open, high, low, close, volume):\n";
 //alert("1." + s);
    var N = arStock[1].length;

    for (var i = N-1; i >=0; i--) {
        s += arStock[1][i] + "  " + (1 * arStock[2][i]).toFixed(2) + "   " + (1 * arStock[3][i]).toFixed(2) + "   " + (1 * arStock[4][i]).toFixed(2) + "   " + (1 * arStock[5][i]).toFixed(2) + "   " + arStock[6][i] + "\n";
    }
alert("end of showStockData2");
    return s;
}
*/
/*
function showStockData2(arStock) {
    var s = arStock[0][0] + " (open, high, low, close, volume):\n";
//  alert("1." + s);
    var N = arStock[1].length;

    for (var i = N - 1; i >= 0; i--) {
        s += dateDailyFromIndex(arStock[1][i]) + "  " + (1 * arStock[2][i]).toFixed(2) + "   " + (1 * arStock[3][i]).toFixed(2) + "   " + (1 * arStock[4][i]).toFixed(2) + "   " + (1 * arStock[5][i]).toFixed(2) + "   " + arStock[6][i] + "\n";
    }
alert("end of showStockData2");
    return s;
}
*/
function showStockData3(arStock) {
    var s = arStock[0][0] + " (open, high, low, close, volume):\n";
    //  alert("1." + s);
    var N = arStock[1].length;

    for (var i = N - 1; i >0; i--) {
    //      s += arStock[0][i] + "  " + (1 * arStock[1][i]).toFixed(2) + "   " + (1 * arStock[2][i]).toFixed(2) + "   " + (1 * arStock[3][i]).toFixed(2) + "   " + (1 * arStock[4][i]).toFixed(2) + "   " + arStock[5][i] + "\n";
          s += arStock[0][i] + "  " + BuildString(1 * arStock[1][i]) + "   " + BuildString(1 * arStock[2][i]) + "   " + BuildString(1 * arStock[3][i]) + "   " + BuildString(1 * arStock[4][i]) + "   " + arStock[5][i] + "\n";
    }
//alert("end of showStockData3");
    return s;
}
function findNameInAvailableArray(sName) {
    var index = -1;
    for (var i = 0; i < arAvailableStiocks.length; i++) {
        if (sName.toUpperCase() == arAvailableStiocks[i][0][0]) return i;
    }
    return index;
}
function indexDailyFromDate(sYmd)// "SaturdaySunday";
{
    var ymd = sYmd.split("-");
    var year = 1 * ymd[0];
    var month = 1 * ymd[1];
    var day = 1 * ymd[2];

//    var year = sYmd.substring(0, 4);
 //   var month = sYmd.substring(5, 7);
    //    var day = sYmd.substring(8);

    /*
    var delta = (Number(year) - 1962) * 12 * 31 + (Number(month) - 1) * 31 + (Number(day) - 1);
    if (bDatesArePrepaired) {
        return arFromDeltaDateToIndex[delta];
    }
    */
    //year +=1900;

//alert(sYmd + "->" + year + " " + " " + month + " " + day);
    var cum = [31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var j = day - 1;	 // jan 1
    if (month > 1) j += cum[month - 2];
    if (year % 4 == 0 && month > 2) j += 1;
    var y4 = Math.floor((year - 1901) / 4);
    j += 1461 * y4;
    for (var i = 1901 + 4 * y4; i < year; i++) {
        j += 365;
        if (i % 4 == 0) j += 1;
    }
 //   return -1 + 5 * Math.floor((j + 1) / 7) + (j + 1) % 7;
    return -1 + 5 * Math.floor((j + 1) / 7) + (j + 1) % 7 - nGlobalShift;///////////////////////////3/17/2017
    /*
        var ymd = sYmd.split("-");
    var year = 1 * ymd[0];
    var month = 1 * ymd[1];
    var day = 1 * ymd[2];
    //alert(sYmd + "->" + year + " " + " " + month + " " + day);
    var cum = [31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var j = day - 1;	 // jan 1
    if (month > 1) j += cum[month - 2];
    if (year % 4 == 0 && month > 2) j += 1;
    var y4 = Math.floor((year - 1901) / 4);
    j += 1461 * y4;
    for (var i = 1901 + 4 * y4; i < year; i++) {
        j += 365;
        if (i % 4 == 0) j += 1;
    }
    //   return -1 + 5 * Math.floor((j + 1) / 7) + (j + 1) % 7;
    return -1 + 5 * Math.floor((j + 1) / 7) + (j + 1) % 7;///////////////////////////3/17/2017
    */
}
function dateDailyFromIndex( nIndex)
{
    /*
    if (bDatesArePrepaired) {
        return arFromDeltaIndexToStrDate[nIndex - startIndex];
    }
    */
nIndex = nIndex + nGlobalShift;/////////////////////////////////////////////////////////////////3/17/2017

    if (nIndex == undefined || isNaN(nIndex) ) return "0";

    var col = nIndex;
    var j = -1 + 7 * Math.floor((col + 1) / 5) + (col + 1) % 5;
    var i = 1900;
    i = 1900 + 4 * Math.floor(j / 1461);
    j = j % 1461 + 1;	// 1 jan
    while (j > 0) {
        i++;
        j -= 365;
        if (i % 4 == 0) j -= 1;
    }
    j += 365;
    if (i % 4 == 0) j += 1;
    var days = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    if (i % 4 == 0) days[1] = 29;
    else days[1] = 28;
    var m = -1;
    while (true) {
        m++;
        j -= days[m];
        if (j <= 0){
            j += days[m];
            break;
        }
    }
    var year = i;
    var m1 = m + 1;
    if (m1 < 10) m1 = "0" + m1;
    if (j < 10) j = "0" + j;
    return year+"-"+m1+ "-" + j;
}
/*
function getArraysOfData1(err, data) {
    bBusy = true;
    //alert("1. arAvailableStiocks.length=" + arAvailableStiocks.length);

    var empty;
    if (err) {
     //   alert("error in data feed");
        return;
    }
    var N = data.quote.length;
    //alert("N=" + N);
    //  var startDate = data.quote[N - 1]["Date"];
    var prevIndex = 0;
    var Diff = 0;
    for (var i = 0; i < N; i++) {
        var di = data.quote[N - 1 - i];
        var sDate = di["Date"];
        var dailyIndex = indexDailyFromDate(sDate);
        var open = di["Open"];
        var high = di["High"];
        var low = di["Low"];
        var close = di["Close"];
        //alert(sDate +" "+prevIndex+" "+dailyIndex);
        if (i == 0) {

            //  arStock[0].push(sDate); // do not push: there the name already
            arStock[1].push(dailyIndex);// for open
            arStock[2].push(dailyIndex);// for high
            arStock[3].push(dailyIndex);// for low
            arStock[4].push(dailyIndex);// for close
            arStock[5].push(dailyIndex);// for volume

            arStock[0].push(sDate);
            arStock[1].push(di["Open"]);
            arStock[2].push(di["High"]);
            arStock[3].push(di["Low"]);
            arStock[4].push(di["Close"]);
            arStock[5].push(di["Volume"]);
            prevIndex = dailyIndex;
        }
        else {
            var nDiff = dailyIndex - prevIndex;
            if (nDiff != 1) {
                //alert("nDiff=" + nDiff + "sDate="+sDate);
                for (var k = 0; k < nDiff - 1; k++)//holidays
                {
                    //dailyIndex = prevIndex + 1+k;
                    arStock[0].push(dateDailyFromIndex(prevIndex + 1 + k));
                    arStock[1].push(empty);
                    arStock[2].push(empty);
                    arStock[3].push(empty);
                    arStock[4].push(empty);
                    arStock[5].push(empty);
                }
            }
            {
                arStock[0].push(sDate);
                arStock[1].push(di["Open"]);
                arStock[2].push(di["High"]);
                arStock[3].push(di["Low"]);
                arStock[4].push(di["Close"]);
                arStock[5].push(di["Volume"]);
                prevIndex = dailyIndex;
            }
        }
    }

    //   nPushedSymbols++;

    //alert(showStockData3(arStock));
    var indexAvailable = arAvailableStiocks.length;
    //alert("2. arAvailableStiocks.length=" + arAvailableStiocks.length);
    //  var index = nTestedFromBothSymbolList - arSymbolList.length - arHiddenList.length;
    var index = nTestedFromBothSymbolList - arSymbolList.length;
    //alert("nTestedFromBothSymbolList=" + nTestedFromBothSymbolList + " index=" + index + " indexAvailable=" + indexAvailable);// 0 -2 0; // 1 -1 1

    if (index < 0) {
        arFromSymbolListToAvailableIndex[nTestedFromBothSymbolList] = indexAvailable;//0->0 //1->1
        //alert("1.pushing into available " + arStock[0][0]);
        arAvailableStiocks.push(arStock);
    }
    else if (index + 1 < arParallelList.length) {
        arFromParallelListToAvailableIndex[index + 1] = indexAvailable;
        //alert("2.pushing into available " + arStock[0][0]);
        arAvailableStiocks.push(arStock);
    }
    else {
        arAvailableStiocks.push(arStock);//????????????????
    }
    /////////////////////////

    if (!bInsideOfOnLoad) {// and if all data recieved????
        //alert("nTestedFromBothSymbolList=" + nTestedFromBothSymbolList + " arBothSymbolList.length=" + arBothSymbolList.length + " bBusy=" + bBusy);

        var elem = document.getElementById("myBar");
        var width = elem.style.width;
        var res = width.replace("%", "");
        res = 100 * nTestedFromBothSymbolList / arBothSymbolList.length;
        //
        //   res = 100 * nPushedSymbols / arBothSymbolList.length;

        elem.style.width = res + '%';
        //alert("1. width=" + width);
        //myDrawingFunction();////////////////

        //callCalculateA();
        //  Calculate("22. some stocks were added to available( Recalculate?");

    }

    //////////////////////////////

    if (bShowDlg == true && sSymbolFormula == "symbol" && nForDlg < arFromSymbolListToAvailableIndex.length) {// if the use was very fast
        var iAvlbl = arFromSymbolListToAvailableIndex[nForDlg];
        var s = showStockData2(arAvailableStiocks[iAvlbl]);
        //alert(s);
        document.getElementById("txtSymbFormula" + nForDlg).value = s;// Symbol #" + n;
    }

    nTestedFromBothSymbolList++;
    var sStock = nextUnavailableStock();

    //alert("sStock=" + sStock);

    if (sStock == "") {
        bBusy = false;
        var elem = document.getElementById("myBar");
        elem.style.width = 0 + '%';

        //      show("4. arFromSymbolListToAvailableIndex", arFromSymbolListToAvailableIndex);
        //       show("4. arFromParallelListToAvailableIndex", arFromParallelListToAvailableIndex);
        // Calculate("1. some stocks were added to available( Recalculate?");



        //  alert("2. arAvailableStiocks.length=" + arAvailableStiocks.length);



        if (!bInsideOfOnLoad) {
            Calculate("22. some stocks were added to available( Recalculate?");
            myDrawingFunction();
        }
        else {
            bInsideOfOnLoad = false;
            openSelectedChart(nSelectedPredefinedName);//empty chart
        }

    }
    else {
        if (bGoogleFeed) {
            getArraysOfDataG(sStock);
        }
        else {
            getStock(prepareArStock(sStock), 'historicaldata', function (err, data) {
                getArraysOfData1(err, data);
            });//or getArraysOfData2 ????/    
        }
    }

}
*/
//////////////////////////////
function getArraysOfDataG(sStock) {
//alert("G");
        bBusy = true;

        arStock = [[], [], [], [], [], [], []];
        arStock[0][0] = sStock.toUpperCase();

//alert("sStock.toUpperCase()=" + sStock.toUpperCase());
    /////////////////////////////
  //      if (!bPassword) {
  //          sStock="";
  //      }
        var sStockSYMBOL = sStock.toUpperCase();
        var sStockSymbol = sStock.toLowerCase();
  /*      var nT = sStockSymbol.substring(1);
        if (sStockSYMBOL[0] == 'T' && !isNaN(nT))
        {
            arStock = stockFromTable(1 * nT);
            arStock[0][0] = sStockSYMBOL;
        }
        else  */  //9/9/2017
        {
   //     arDatePoints[0] = sStockSYMBOL;
    //   arStock[0] = arDatePoints.slice();
        switch (sStockSYMBOL) {
            case 'AAPL': arStock = AAPL; break;
            case 'GOLD': arStock = GOLD; break;
            case 'TSLA': arStock = TSLA; break;            
            case 'YHOO': arStock = YHOO; break;
            case 'GOOG': arStock = GOOG; break;
            case 'GOOGL':  arStock = GOOGL; break;
            case 'AXP':  arStock = AXP; break;
            case 'BA': arStock = BA; break;
            case 'CAT':  arStock = CAT; break;
            case 'CSCO': arStock = CSCO; break;
            case 'CVX': arStock = CVX; break;
            case 'KO': arStock = KO; break;
            case 'DD': arStock = DD; break;
            case 'XOM': arStock = XOM; break;
            case 'GE': arStock = GE; break;
            case 'GS': arStock = GS; break;
            case 'HD': arStock = HD; break;
            case 'IBM': arStock = IBM; break;
            case 'INTC':  arStock = INTC; break;
            case 'JNJ':  arStock = JNJ; break;
            case 'JPM': arStock = JPM; break;
            case 'MCD':  arStock = MCD; break;
            case 'MMM': arStock = MMM; break;
            case 'MRK':  arStock = MRK; break;
            case 'MSFT':arStock = MSFT; break;
            case 'NKE':  arStock = NKE; break;
            case 'PFE': arStock = PFE; break;
            case 'PG': arStock = PG; break;
            case 'TRV':  arStock = TRV; break;
            case 'UNH':  arStock = UNH; break;
            case 'UTX':  arStock = UTX; break;
            case 'V':  arStock = V; break;
            case 'VZ':  arStock = VZ; break;
            case 'WMT': arStock = WMT; break;
            case 'DIS':  arStock = DIS; break;
            case 'AES': arStock = AES; break;
            case 'NVDA':  arStock = NVDA; break;
            case 'SRV':  arStock = SRV; break;
            case 'AMZN': arStock = AMZN; break;
            case 'BIDU': arStock = BIDU; break;
            case 'ORCL':  arStock = ORCL; break;
            case 'ATVI':  arStock = ATVI; break;
            case 'GME':  arStock = GME; break;
            case 'LNKD':  arStock = LNKD; break;
            case 'NFLX':  arStock = NFLX; break;
            case 'A':  arStock = A; break;
            case 'B': arStock = B; break;
            case 'C': arStock = C; break;
            case 'D': arStock = D; break;
            case 'F': arStock = F; break;
            case 'G': arStock = G; break;
            case 'K': arStock = K; break;
            case 'M': arStock = M; break;

            default: //alert("No data for... " + sStock);
                //return null;
                break;
        }
    //var sStartDateG = '2016-06-07';
        sStartDateG = sStartDateG.slice(0, 11);
//alert("sStartDateG=" + sStartDateG);
var deltaIdx = indexDailyFromDate(sStartDateG);// - nGlobalShift;
//alert("deltaIdx=" + deltaIdx);
        arStock[1][0] = deltaIdx;
        arStock[2][0] = deltaIdx;
        arStock[3][0] = deltaIdx;
        arStock[4][0] = deltaIdx;
        arStock[5][0] = deltaIdx;
        }

       //         alert("arStock[0]=" + arStock[0]);
       //         alert("arStock[4]=" + arStock[4]);
       //         alert("arStock[5]=" + arStock[5]);
       // arStock[0] = arDatePoints.slice();
    ///////////////////////////
 //       alert(showStockData3(arStock));

        var indexAvailable = arAvailableStiocks.length;
        //alert("2. arAvailableStiocks.length=" + arAvailableStiocks.length);
        //  var index = nTestedFromBothSymbolList - arSymbolList.length - arHiddenList.length;
        var index = nTestedFromBothSymbolList - arSymbolList.length;
        //alert("nTestedFromBothSymbolList=" + nTestedFromBothSymbolList + " index=" + index + " indexAvailable=" + indexAvailable);// 0 -2 0; // 1 -1 1

        if (index < 0) {
            arFromSymbolListToAvailableIndex[nTestedFromBothSymbolList] = indexAvailable;//0->0 //1->1
            //alert("1.pushing into available " + arStock[0][0]);
            arAvailableStiocks.push(arStock);
        }
        else if (index + 1 < arParallelList.length) {
            arFromParallelListToAvailableIndex[index + 1] = indexAvailable;
            //alert("2.pushing into available " + arStock[0][0]);
            arAvailableStiocks.push(arStock);
        }
        else {
            arAvailableStiocks.push(arStock);//????????????????
        }
        /////////////////////////
        if (!bInsideOfOnLoad) {// and if all data recieved????
//alert("nTestedFromBothSymbolList=" + nTestedFromBothSymbolList + " arBothSymbolList.length=" + arBothSymbolList.length + " bBusy=" + bBusy);

            var elem = document.getElementById("myBar");
            var width = elem.style.width;
            var res = width.replace("%", "");
            res = 100 * nTestedFromBothSymbolList / arBothSymbolList.length;
            elem.style.width = res + '%';
// alert("mm");
        }
        if (bShowDlg == true && sSymbolFormula == "symbol" && nForDlg < arFromSymbolListToAvailableIndex.length) {// if the use was very fast
            var iAvlbl = arFromSymbolListToAvailableIndex[nForDlg];
            var s = showStockData2(arAvailableStiocks[iAvlbl]);
//alert(s);
            document.getElementById("txtSymbFormula" + nForDlg).value = s;// Symbol #" + n;
        }

//alert("arFromSymbolListToAvailableIndex=" + arFromSymbolListToAvailableIndex);


        nTestedFromBothSymbolList++;
        var sStock = nextUnavailableStock();

//alert("sStock=" + sStock);

        if (sStock == "") {
//alert("a");
            bBusy = false;
            var elem = document.getElementById("myBar");
            elem.style.width = 0 + '%';
//alert("b");
            if (!bInsideOfOnLoad) {
//alert(10);
                Calculate("22. some stocks were added to available( Recalculate?");
                myDrawingFunction();
//alert(20);
            }
            else {
                bInsideOfOnLoad = false;
                openSelectedChart(nSelectedPredefinedName);//empty chart
            }

        }
        else {
                getArraysOfDataG(sStock);
        }   
}
/*
function fromQuadndlToStock(data, sStockSYMBOL) {
    alert("data.length=" + data.length);

    var quotes = data.split("\n");
    alert("quotes.length=" + quotes.length);
    var s = "";
    var s0 = ""; var s1 = ""; var s2 = ""; var s3 = ""; var s4 = ""; var s5 = "";
    for (var i = quotes.length-1; i >0; i--) {
        if (quotes[i]=="") continue;// Date, open,high....
        //s += oneDayRecord(JSON.stringify(quotes[i], null, 2));
        if (s0!="") {
            s0 += ","; s1 += ","; s2 += ","; s3 += ","; s4 += ","; s5 += ",";
        }
        //alert("quotes[i]=" + quotes[i]);
    //    var jStr = JSON.stringify(quotes[i], null, 2);
        //    alert("jStr=" + jStr);
        var ar = quotes[i].split(",");
        //     var six = sixRecords(JSON.stringify(quotes[i], null, 2));
        //    s0 += six[0]; s1 += six[1]; s2 += six[2]; s3 += six[3]; s4 += six[4]; s5 += six[5];
        s0 += ar[0]; s1 += ar[8]; s2 += ar[8]; s3 += ar[10]; s4 += ar[11]; s5 += ar[12];

    }

    return getArrays(s0, s1, s2, s3, s4, s5, sStockSYMBOL);
}*/
function getArrays(s0, s1, s2, s3, s4, s5, sStockName) {

 //   nGlobalShift = 0;

    arStock = [[],[],[],[],[],[]];
    var ar0 = s0.split(",");
    var ar1 = s1.split(",");
    var ar2 = s2.split(",");
    var ar3 = s3.split(",");
    var ar4 = s4.split(",");
    var ar5 = s5.split(",");


 
    var N = ar0.length;//=...=ar5.length;
//alert("N=" + N);
    //  var startDate = data.quote[N - 1]["Date"];
    var prevIndex = 0;

    var Diff = 0;
    for (var i = 0; i < N; i++) {

        //var j = N - 1 - i;
        var j = i;
        var sDate = ar0[j];// di["Date"];

    /*    if (isNaN(1 * ar4[j])) {
            alert(sStockName + ": bad data");
            throw sStockName + ": bad data";
            return;
        }*/



        var dailyIndex = indexDailyFromDate(sDate);

       if (i == 0) {

            arStock[0].push(sStockName); // stock Name //////////
            arStock[1].push(dailyIndex);// for open 0 ???
            arStock[2].push(dailyIndex);// for high
            arStock[3].push(dailyIndex);// for low
            arStock[4].push(dailyIndex);// for close
            arStock[5].push(dailyIndex);// for volume

            arStock[0].push(sDate);
            arStock[1].push(ar1[j]);//push(di["Open"]);
            arStock[2].push(ar2[j]);//.push(di["High"]);
            arStock[3].push(ar3[j]);//.push(di["Low"]);
            arStock[4].push(ar4[j]);//.push(di["Close"]);
            arStock[5].push(ar5[j]);//.push(di["Volume"]);

//alert("prevIndex=" + prevIndex + " dailyIndex" + dailyIndex);
            prevIndex = dailyIndex;
        }
        else {

            var nDiff = 1 * dailyIndex - 1 * prevIndex;
            // var nDiff = 1 * prevIndex - 1 * dailyIndex;///////////////////////????????????
//alert("1. nDiff=" + nDiff + "sDate=" + sDate);
           /*   if (Math.abs(nDiff) != 1) {*/
            if (nDiff <= 0) {
               // alert(sDate);
                continue;
            }
            if (nDiff != 1) {
             //   if (ar1[j].isNaN() || ar1[j] == undefined) {
//alert("2. nDiff=" + nDiff + "sDate="+sDate);
                //for (var k = 0; k < nDiff - 1; k++)//holidays
                for (var k = nDiff - 2; k >=0; k--)//holidays
                {
                    var empty;
                    //arStock[0] += "," + dateDailyFromIndex(prevIndex + 1 + k);
                    arStock[0].push(dateDailyFromIndex(dailyIndex - 1 - k) );///////////////////////????????????
//alert("sDate=" + sDate + " arStock[0][]=" + dateDailyFromIndex(dailyIndex + 1 + k));
                    arStock[1].push(empty);
                    arStock[2].push(empty);
                    arStock[3].push(empty);
                    arStock[4].push(empty);
                    arStock[5].push(empty);
                  //  arStock[5].push(0);
                    //  arStock[0] += "," + dateDailyFromIndex(prevIndex + 1 + k);
                }
            }
            {
                arStock[0].push(sDate);
                arStock[1].push(ar1[j]);//push(di["Open"]);
                arStock[2].push(ar2[j]);//.push(di["High"]);
                arStock[3].push(ar3[j]);//.push(di["Low"]);
                arStock[4].push(ar4[j]);//.push(di["Close"]);
                arStock[5].push(ar5[j]);//.push(di["Volume"]);
                prevIndex = dailyIndex;
            }
       }
        /*
       var k20=Math.floor(N / 20);
       if (i / k20 == Math.floor(i / k20)) {
 alert("i/k20=" + i / k20);
           var elem = document.getElementById("myBar");
           var width = elem.style.width;
           var res = width.replace("%", "");
           res = 100 * i / k20;
           elem.style.width = res + '%';
       }
       */

    }
  
    return arStock;
}
/*
function globalIndexDailyFromDate(sYmd)// "SaturdaySunday";
{    //year +=1900;
    var ymd = sYmd.split("-");
    var year = 1 * ymd[0];
    var month = 1 * ymd[1];
    var day = 1 * ymd[2];
    //alert(sYmd + "->" + year + " " + " " + month + " " + day);
    var cum = [31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var j = day - 1;	 // jan 1
    if (month > 1) j += cum[month - 2];
    if (year % 4 == 0 && month > 2) j += 1;
    var y4 = Math.floor((year - 1901) / 4);
    j += 1461 * y4;
    for (var i = 1901 + 4 * y4; i < year; i++) {
        j += 365;
        if (i % 4 == 0) j += 1;
    }
    //   return -1 + 5 * Math.floor((j + 1) / 7) + (j + 1) % 7;
    return -1 + 5 * Math.floor((j + 1) / 7) + (j + 1) % 7;///////////////////////////3/17/2017
}
*/
/*
function dateDailyFromIndex(nIndex) {
    // nIndex = nIndex + nGlobalShift;/////////////////////////////////////////////////////////////////3/17/2017

    if (nIndex == undefined || isNaN(nIndex)) return "0";

    var col = nIndex;
    var j = -1 + 7 * Math.floor((col + 1) / 5) + (col + 1) % 5;
    var i = 1900;
    i = 1900 + 4 * Math.floor(j / 1461);
    j = j % 1461 + 1;	// 1 jan
    while (j > 0) {
        i++;
        j -= 365;
        if (i % 4 == 0) j -= 1;
    }
    j += 365;
    if (i % 4 == 0) j += 1;
    var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (i % 4 == 0) days[1] = 29;
    else days[1] = 28;
    var m = -1;
    while (true) {
        m++;
        j -= days[m];
        if (j <= 0) {
            j += days[m];
            break;
        }
    }
    var year = i;
    var m1 = m + 1;
    if (m1 < 10) m1 = "0" + m1;
    if (j < 10) j = "0" + j;
    return year + "-" + m1 + "-" + j;
}
*/
function getArraysOfDataW(data, sStockSYMBOL) {
 //alert("getArraysOfDataW");
    bBusy = true;

    var sStockSymbol = sStockSYMBOL.toLowerCase();
    var nT = sStockSymbol.substring(1);
//alert("getArraysOfDataW: sStockSYMBOL[0]="+sStockSYMBOL[0]+" nT="+nT);
    if(data==""){    
           arStock = [[], [], [], [], [], [], []];
           arStock[0][0] = sStockSYMBOL.toUpperCase();
           sStartDateG = sStartDateG.slice(0, 11);
        //alert("sStartDateG=" + sStartDateG);
           var deltaIdx = indexDailyFromDate(sStartDateG);// - nGlobalShift;
//alert("deltaIdx=" + deltaIdx);
           arStock[1][0] = deltaIdx;
           arStock[2][0] = deltaIdx;
           arStock[3][0] = deltaIdx;
           arStock[4][0] = deltaIdx;
           arStock[5][0] = deltaIdx;
    }/*
    else if (sStockSYMBOL[0] == 'T' && !isNaN(nT)) {
//alert("from Table")
        arStock = stockFromTable(1 * nT);
        arStock[0][0] = sStockSYMBOL;
       
    }*/     // 9/9/2017
    else
    {
//alert("data.length=" + data.length);
        var quotes = data.split("\n");
//alert("quotes.length=" + quotes.length);
        var s = "";
        var s0 = ""; var s1 = ""; var s2 = ""; var s3 = ""; var s4 = ""; var s5 = "";
        for (var i = quotes.length - 1; i > 0; i--) {
            if (quotes[i] == "") continue;// Date, open,high....
            //s += oneDayRecord(JSON.stringify(quotes[i], null, 2));
            if (s0 != "") {
                s0 += ","; s1 += ","; s2 += ","; s3 += ","; s4 += ","; s5 += ",";
            }
            var ar = quotes[i].split(",");
            s0 += ar[0]; s1 += ar[8]; s2 += ar[9]; s3 += ar[10]; s4 += ar[11]; s5 += ar[12];

        }
       //     alert("s0="+s0);
//alert("s4=" + s4);
        //      alert("s5=" + s5);

    //    try{
            arStock = getArrays(s0, s1, s2, s3, s4, s5, sStockSYMBOL);
//        }
//        catch (err) {
//            alert(err.message);
//            return;
 //       }

//alert("arStock[0][0]=" + arStock[0][0]);
       // myDrawingFunction();///add:  6-22-2017//remove: 7/5/2017
        /*
        var ar = arStock[0].split(",");
        var M = ar.length;
        alert("m. ar[0]=" + ar[0] + " ar[M-2]=" + ar[M - 2] + " ar[M-1]=" + ar[M - 1]);
        alert("m. arStock[0]=" + arStock[0]);
        alert("m. arStock[4]=" + arStock[4]);
        alert("m. arStock[5]=" + arStock[5]);
        */
    }

//alert(showStockData3(arStock));
    var indexAvailable = arAvailableStiocks.length;
//alert("2. arAvailableStiocks.length=" + arAvailableStiocks.length);
    //  var index = nTestedFromBothSymbolList - arSymbolList.length - arHiddenList.length;
    var index = nTestedFromBothSymbolList - arSymbolList.length;
    //alert("nTestedFromBothSymbolList=" + nTestedFromBothSymbolList + " index=" + index + " indexAvailable=" + indexAvailable);// 0 -2 0; // 1 -1 1


  //  alert("arStock=" + arStock);


    if (index < 0) {
        arFromSymbolListToAvailableIndex[nTestedFromBothSymbolList] = indexAvailable;//0->0 //1->1
        //alert("1.pushing into available " + arStock[0][0]);
        arAvailableStiocks.push(arStock);
    }
    else if (index + 1 < arParallelList.length) {
        arFromParallelListToAvailableIndex[index + 1] = indexAvailable;
        //alert("2.pushing into available " + arStock[0][0]);
        arAvailableStiocks.push(arStock);
    }
    else {
        arAvailableStiocks.push(arStock);//????????????????
    }
    /////////////////////////

    if (!bInsideOfOnLoad) {// and if all data recieved????
        //alert("nTestedFromBothSymbolList=" + nTestedFromBothSymbolList + " arBothSymbolList.length=" + arBothSymbolList.length + " bBusy=" + bBusy);

        var elem = document.getElementById("myBar");
        var width = elem.style.width;
        var res = width.replace("%", "");
        res = 100 * nTestedFromBothSymbolList / arBothSymbolList.length;
        //
        //   res = 100 * nPushedSymbols / arBothSymbolList.length;

        elem.style.width = res + '%';

    }

    //////////////////////////////

    if (bShowDlg == true && sSymbolFormula == "symbol" && nForDlg < arFromSymbolListToAvailableIndex.length) {// if the use was very fast
        var iAvlbl = arFromSymbolListToAvailableIndex[nForDlg];
        var s = showStockData2(arAvailableStiocks[iAvlbl]);
        //alert(s);
        document.getElementById("txtSymbFormula" + nForDlg).value = s;// Symbol #" + n;
    }

    nTestedFromBothSymbolList++;
    var sStock = nextUnavailableStock();

//alert("sStock=" + sStock);

    if (sStock == "") {
        bBusy = false;
        var elem = document.getElementById("myBar");
        elem.style.width = 0 + '%';

        //      show("4. arFromSymbolListToAvailableIndex", arFromSymbolListToAvailableIndex);
        //       show("4. arFromParallelListToAvailableIndex", arFromParallelListToAvailableIndex);
        // Calculate("1. some stocks were added to available( Recalculate?");



        //  alert("2. arAvailableStiocks.length=" + arAvailableStiocks.length);



        if (!bInsideOfOnLoad) {
            Calculate("22. some stocks were added to available( Recalculate?");
            myDrawingFunction();
        }
        else {
            bInsideOfOnLoad = false;
            openSelectedChart(nSelectedPredefinedName);//empty chart
        }

    }
    else {


        var sStockSymbol = sStock.toLowerCase();
      /*  var nT = sStockSymbol.substring(1);
     //   alert("sStockSYMBOL[0]="+sStockSYMBOL[0]+" nT="+nT);
        if (sStockSYMBOL[0] == 'T' && !isNaN(nT)) {
            arStock = getArraysOfDataW(null, sStock);
        }
        else */  //9/9/201
        {
         //   $.get("https://www.quandl.com/api/v3/datasets/WIKI/" + sStock.toUpperCase() + ".csv")//
            $.get("https://www.quandl.com/api/v3/datasets/WIKI/" + sStock.toUpperCase() + ".csv?rows=250250")
          /*      .done(function (data) {
 alert("2. data=" + data);
                    arStock = getArraysOfDataW(data, sStock);
                });
                */
            .always(function (data) {
//alert("2.always. sStock=" + sStock);
//alert("2.always. data=" + data);
                var s = data.length;
                if (s == undefined) {

                    //   arStock = [[], [], [], [], [], [], []];
                    //    arStock[0][0] = sStock.toUpperCase();
                    data = "";
                    arStock = getArraysOfDataW(data, sStock);
                }
                else 
                    if (data != null)  {
                        arStock = getArraysOfDataW(data, sStock);
                    }
            });
        }
    }

}
/*
function prepareDatesAndIndexes() {

    arFromDeltaIndexToStrDate = [];
    arFromDeltaDateToIndex = [];

    startIndex = indexDailyFromDate("1962-01-01");
    endIndex = indexDailyFromDate("2032-12-31");

//alert("startIndex=" + startIndex + " endIndex=" + endIndex);

    for (var i = 0; i <= endIndex; i++) {
        arFromDeltaIndexToStrDate.push(dateDailyFromIndex(startIndex+i));
    }

    for (var yyyy = 1962; yyyy <= 2032; yyyy++) {
        for (var mm = 1; mm <= 12; mm++) {
            for (var dd = 1; dd <= 31; dd++) {
                var sDate = yyyy + "-";
                if (mm * 1 < 10) sDate += "0" + mm + "-";
                else sDate += mm + "-";
                if (dd < 10) sDate += "0" + dd;
                else sDate += dd;
      //          if (sDate == "2017-06-07") {
      //              alert("idx=" + idx);
      //          }
                var idx = indexDailyFromDate(sDate);

                arFromDeltaDateToIndex.push(idx);
            }
        }
    }


    var sDate = "2017-06-07";
    var idx = indexDailyFromDate(sDate);
//alert(sDate + "=" + idx);

    var delta = (2017 - 1962) * 12 * 31 + (6 - 1) * 31 + (7 - 1);
    idx = arFromDeltaDateToIndex[delta];
//alert("delta=" + delta + " idx=" + idx + " sDate=" + arFromDeltaIndexToStrDate[idx - startIndex]);

    bDatesArePrepaired = true;
}
*/
/*
function getDataInBackground() {
    var dow = ['aapl', 'axp', 'ba', 'cat', 'csco', 'cvx', 'ko', 'dd', 'xom', 'ge', 'gs', 'hd', 'ibm', 'intc', 'jnj', 'jpm', 'mcd', 'mmm', 'mrk', 'msft', 'nke', 'pfe', 'pg', 'trv', 'unh', 'utx', 'v', 'vz', 'wmt', 'dis'];
    
    for (var i = 0; i < dow.length; i++) {
        if (bBusy) return;
        bBusy = true;
        arSymbolList = [dow[i]];

        if (arParallelList == null) arParallelList = [];
        ////////////////////////////////////////////////
        //    alert("0.getData");
        // nPushedSymbols = 0;
        var arHiddenList = findHiddenSymbols();

        // eat spaces from arSymbolList and from arParallelList
        //  eat();
        eatSpacesFromArray(arSymbolList);
        eatSpacesFromArray(arParallelList);
        //   eatSpacesFromArray(arHiddenList);
        if (arAvailableStiocks == null) arAvailableStiocks = new Array();


        // List of all needed stocks
        //alert("arAvailableStiocks.length=" + arAvailableStiocks.length);
        //show("arSymbolList", arSymbolList);
        //show("arParallelList", arParallelList);
        arBothSymbolList = new Array();
        for (var i = 0; i < arSymbolList.length; i++) {
            arBothSymbolList.push(arSymbolList[i].toUpperCase());
        }
        for (var i = 0; i < arParallelList.length; i++) {
            arBothSymbolList.push(arParallelList[i].toUpperCase());
        }
        for (var i = 0; i < arHiddenList.length; i++) {
            arBothSymbolList.push(arHiddenList[i].toUpperCase());
        }


        arFromSymbolListToAvailableIndex = new Array();
        arFromParallelListToAvailableIndex = new Array();


        // add stock which are still unavailable
        //alert("before addStocksToArAvailableStiocks");
        var nStocksAdded = addStocksToArAvailableStiocks();// main line!!!!!!!!!!!!!!!!!!!!!!!!
        //alert("after addStocksToArAvailableStiocks");


        bBusy = false;
    }
}
*/
/*
function addCurrentPrices() {
    alert("addCurrentPrices");
    //https://www.quandl.com/api/v3/datasets/WIKI/AAPL.csv?rows=1
//bBusy = true;//????????????????????????????????????????????????????????
    arCurrentStockNames = [];
    var sStock = arBothSymbolList[0];

        sStock = sStock.toUpperCase();
        var sStockSYMBOL = sStock;
        var sStockSymbol = sStock.toLowerCase();
        var nT = sStockSymbol.substring(1);
        //alert("sStockSYMBOL[0]="+sStockSYMBOL[0]+" nT="+nT);
        if (sStockSYMBOL[0] == 'T' && !isNaN(nT)) {
            arStock = getArraysOfDataWCurrent(null, sStock);
        }
        else {
            $.get("https://www.quandl.com/api/v3/datasets/WIKI/" + sStock + ".csv?rows=1")
          .always(function (data) {
              //alert("1.always. sStock=" + sStock);
              //alert("1.always. data=" + data);
              var s = data.length;
              if (s == undefined) {
                  //   arStock = [[], [], [], [], [], [], []];
                  //    arStock[0][0] = sStock.toUpperCase();
                  data = "";
                  arStock = getArraysOfDataWCurrent(data, sStock);
              }
              else
                  if (data != null) {
                      arStock = getArraysOfDataWCurrent(data, sStock);
                  }
          });
        }
}
function getArraysOfDataWCurrent(data, sStockSYMBOL) {
}
*/