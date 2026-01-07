import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';

@Injectable()
export class UsersService {
 

 private users = [
  { id: 1, firstName: "nika", lastName: "daraxvelidze", email: "nika.daraxvelidze@gmail.com", phoneNumber: "595123456", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 0, 15)), subscriptionEndDate: new Date(Date.UTC(2026, 0, 15)) },
  { id: 2, firstName: "mzia", lastName: "daraxvelidze", email: "mzia.daraxvelidze@gmail.com", phoneNumber: "577987654", gender: 2, subscriptionStartDate: new Date(Date.UTC(2024, 10, 20)), subscriptionEndDate: new Date(Date.UTC(2025, 10, 20)) },
  { id: 3, firstName: "giorgi", lastName: "tavartkiladze", email: "giorgi.t@gmail.com", phoneNumber: "599112233", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 2, 1)), subscriptionEndDate: new Date(Date.UTC(2026, 2, 1)) },
  { id: 4, firstName: "ana", lastName: "kapanadze", email: "ana.kapanadze@yahoo.com", phoneNumber: "551445566", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 5, 10)), subscriptionEndDate: new Date(Date.UTC(2026, 5, 10)) },
  { id: 5, firstName: "luka", lastName: "beridze", email: "luka.beridze@outlook.com", phoneNumber: "598334455", gender: 1, subscriptionStartDate: new Date(Date.UTC(2024, 11, 5)), subscriptionEndDate: new Date(Date.UTC(2025, 11, 5)) },
  { id: 6, firstName: "mariami", lastName: "jishkariani", email: "mari.jishkariani@gmail.com", phoneNumber: "557889900", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 3, 22)), subscriptionEndDate: new Date(Date.UTC(2026, 3, 22)) },
  { id: 7, firstName: "davit", lastName: "gogiberidze", email: "davit.gogi@hotmail.com", phoneNumber: "595667788", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 1, 18)), subscriptionEndDate: new Date(Date.UTC(2026, 1, 18)) },
  { id: 8, firstName: "sofio", lastName: "mikeladze", email: "sofio.mikeladze@gmail.com", phoneNumber: "579223344", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 6, 30)), subscriptionEndDate: new Date(Date.UTC(2026, 6, 30)) },
  { id: 9, firstName: "irakli", lastName: "shengelidze", email: "irakli.shengelidze@gmail.com", phoneNumber: "591556677", gender: 1, subscriptionStartDate: new Date(Date.UTC(2024, 9, 12)), subscriptionEndDate: new Date(Date.UTC(2025, 9, 12)) },
  { id: 10, firstName: "tamari", lastName: "kvachatadze", email: "tamari.kvachatadze@yahoo.com", phoneNumber: "555778899", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 4, 14)), subscriptionEndDate: new Date(Date.UTC(2026, 4, 14)) },
  { id: 11, firstName: "aleksandre", lastName: "papunashvili", email: "aleks.papuna@gmail.com", phoneNumber: "599001122", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 7, 8)), subscriptionEndDate: new Date(Date.UTC(2026, 7, 8)) },
  { id: 12, firstName: "ekaterine", lastName: "tskhvediani", email: "eka.tskhvediani@gmail.com", phoneNumber: "577334455", gender: 2, subscriptionStartDate: new Date(Date.UTC(2024, 8, 25)), subscriptionEndDate: new Date(Date.UTC(2025, 8, 25)) },
  { id: 13, firstName: "nikoloz", lastName: "gelashvili", email: "nikolozi.gelashvili@outlook.com", phoneNumber: "598112233", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 0, 10)), subscriptionEndDate: new Date(Date.UTC(2026, 0, 10)) },
  { id: 14, firstName: "salome", lastName: "abashidze", email: "salome.abashidze@gmail.com", phoneNumber: "551667788", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 10, 3)), subscriptionEndDate: new Date(Date.UTC(2026, 10, 3)) },
  { id: 15, firstName: "saba", lastName: "kvirkvelia", email: "saba.kvirkvelia@gmail.com", phoneNumber: "595889900", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 3, 1)), subscriptionEndDate: new Date(Date.UTC(2026, 3, 1)) },
  { id: 16, firstName: "nino", lastName: "lomidze", email: "nino.lomidze@yahoo.com", phoneNumber: "579445566", gender: 2, subscriptionStartDate: new Date(Date.UTC(2024, 11, 15)), subscriptionEndDate: new Date(Date.UTC(2025, 11, 15)) },
  { id: 17, firstName: "temuri", lastName: "gvinianidze", email: "temuri.gvinia@gmail.com", phoneNumber: "591223344", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 5, 20)), subscriptionEndDate: new Date(Date.UTC(2026, 5, 20)) },
  { id: 18, firstName: "tea", lastName: "chikovani", email: "tea.chikovani@gmail.com", phoneNumber: "555990011", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 2, 12)), subscriptionEndDate: new Date(Date.UTC(2026, 2, 12)) },
  { id: 19, firstName: "vato", lastName: "kalandadze", email: "vato.kalandadze@hotmail.com", phoneNumber: "599778899", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 8, 5)), subscriptionEndDate: new Date(Date.UTC(2026, 8, 5)) },
  { id: 20, firstName: "lizi", lastName: "tsiklauri", email: "lizi.tsiklauri@gmail.com", phoneNumber: "557112233", gender: 2, subscriptionStartDate: new Date(Date.UTC(2024, 10, 11)), subscriptionEndDate: new Date(Date.UTC(2025, 10, 11)) },
  { id: 21, firstName: "zura", lastName: "mchedlidze", email: "zura.mchedlidze@gmail.com", phoneNumber: "598667788", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 1, 28)), subscriptionEndDate: new Date(Date.UTC(2026, 1, 28)) },
  { id: 22, firstName: "ketevan", lastName: "gogoladze", email: "ketevan.gogo@gmail.com", phoneNumber: "551889900", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 6, 17)), subscriptionEndDate: new Date(Date.UTC(2026, 6, 17)) },
  { id: 23, firstName: "levani", lastName: "surmanidze", email: "levani.surmani@outlook.com", phoneNumber: "595445566", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 4, 9)), subscriptionEndDate: new Date(Date.UTC(2026, 4, 9)) },
  { id: 24, firstName: "natela", lastName: "japaridze", email: "natela.japaridze@yahoo.com", phoneNumber: "579001122", gender: 2, subscriptionStartDate: new Date(Date.UTC(2024, 9, 30)), subscriptionEndDate: new Date(Date.UTC(2025, 9, 30)) },
  { id: 25, firstName: "mikheil", lastName: "khutsishvili", email: "mikheil.khutsishvili@gmail.com", phoneNumber: "591334455", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 7, 21)), subscriptionEndDate: new Date(Date.UTC(2026, 7, 21)) },
  { id: 26, firstName: "irine", lastName: "bakradze", email: "irine.bakradze@gmail.com", phoneNumber: "555556677", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 0, 27)), subscriptionEndDate: new Date(Date.UTC(2026, 0, 27)) },
  { id: 27, firstName: "giga", lastName: "tsintsadze", email: "giga.tsintsadze@gmail.com", phoneNumber: "599889900", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 3, 16)), subscriptionEndDate: new Date(Date.UTC(2026, 3, 16)) },
  { id: 28, firstName: "elene", lastName: "makharadze", email: "elene.makharadze@gmail.com", phoneNumber: "577112233", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 9, 4)), subscriptionEndDate: new Date(Date.UTC(2026, 9, 4)) },
  { id: 29, firstName: "bacho", lastName: "kordzaia", email: "bacho.kordzaia@hotmail.com", phoneNumber: "598445566", gender: 1, subscriptionStartDate: new Date(Date.UTC(2024, 11, 22)), subscriptionEndDate: new Date(Date.UTC(2025, 11, 22)) },
  { id: 30, firstName: "maka", lastName: "shavadze", email: "maka.shavadze@gmail.com", phoneNumber: "551223344", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 5, 7)), subscriptionEndDate: new Date(Date.UTC(2026, 5, 7)) },
  { id: 31, firstName: "rezo", lastName: "tabatadze", email: "rezo.tabatadze@gmail.com", phoneNumber: "595667788", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 2, 19)), subscriptionEndDate: new Date(Date.UTC(2026, 2, 19)) },
  { id: 32, firstName: "tamar", lastName: "gelovani", email: "tamar.gelovani@yahoo.com", phoneNumber: "579889900", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 8, 13)), subscriptionEndDate: new Date(Date.UTC(2026, 8, 13)) },
  { id: 33, firstName: "shota", lastName: "rustaveli", email: "shota.rustaveli@gmail.com", phoneNumber: "591001122", gender: 1, subscriptionStartDate: new Date(Date.UTC(2024, 10, 8)), subscriptionEndDate: new Date(Date.UTC(2025, 10, 8)) },
  { id: 34, firstName: "nana", lastName: "orvelashvili", email: "nana.orvela@gmail.com", phoneNumber: "555334455", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 1, 14)), subscriptionEndDate: new Date(Date.UTC(2026, 1, 14)) },
  { id: 35, firstName: "koba", lastName: "davitaia", email: "koba.davitaia@outlook.com", phoneNumber: "599556677", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 6, 26)), subscriptionEndDate: new Date(Date.UTC(2026, 6, 26)) },
  { id: 36, firstName: "lia", lastName: "kiknadze", email: "lia.kiknadze@gmail.com", phoneNumber: "577778899", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 4, 31)), subscriptionEndDate: new Date(Date.UTC(2026, 4, 31)) },
  { id: 37, firstName: "archil", lastName: "sulakvelidze", email: "archil.sulak@gmail.com", phoneNumber: "598112233", gender: 1, subscriptionStartDate: new Date(Date.UTC(2024, 9, 18)), subscriptionEndDate: new Date(Date.UTC(2025, 9, 18)) },
  { id: 38, firstName: "rusudan", lastName: "gogiberidze", email: "rusudan.gogi@gmail.com", phoneNumber: "551445566", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 7, 2)), subscriptionEndDate: new Date(Date.UTC(2026, 7, 2)) },
  { id: 39, firstName: "giorgi", lastName: "mtsedlishvili", email: "giorgi.mtsedli@gmail.com", phoneNumber: "595889900", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 0, 6)), subscriptionEndDate: new Date(Date.UTC(2026, 0, 6)) },
  { id: 40, firstName: "nutsa", lastName: "tsereteli", email: "nutsa.tsereteli@gmail.com", phoneNumber: "579223344", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 10, 29)), subscriptionEndDate: new Date(Date.UTC(2026, 10, 29)) },
  { id: 41, firstName: "zviad", lastName: "gamsakhurdia", email: "zviad.gamsa@gmail.com", phoneNumber: "591667788", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 3, 11)), subscriptionEndDate: new Date(Date.UTC(2026, 3, 11)) },
  { id: 42, firstName: "manana", lastName: "archvadze", email: "manana.archvadze@yahoo.com", phoneNumber: "555990011", gender: 2, subscriptionStartDate: new Date(Date.UTC(2024, 11, 28)), subscriptionEndDate: new Date(Date.UTC(2025, 11, 28)) },
  { id: 43, firstName: "dato", lastName: "turashvili", email: "dato.turashvili@gmail.com", phoneNumber: "599112233", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 5, 25)), subscriptionEndDate: new Date(Date.UTC(2026, 5, 25)) },
  { id: 44, firstName: "sopho", lastName: "nizharadze", email: "sopho.nizharadze@gmail.com", phoneNumber: "577334455", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 2, 8)), subscriptionEndDate: new Date(Date.UTC(2026, 2, 8)) },
  { id: 45, firstName: "tornike", lastName: "shengelia", email: "tornike.shengelia@gmail.com", phoneNumber: "598556677", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 8, 20)), subscriptionEndDate: new Date(Date.UTC(2026, 8, 20)) },
  { id: 46, firstName: "kristine", lastName: "lashkhi", email: "kristine.lashkhi@outlook.com", phoneNumber: "551778899", gender: 2, subscriptionStartDate: new Date(Date.UTC(2024, 10, 16)), subscriptionEndDate: new Date(Date.UTC(2025, 10, 16)) },
  { id: 47, firstName: "andria", lastName: "gvelesiani", email: "andria.gvelesiani@gmail.com", phoneNumber: "595001122", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 1, 5)), subscriptionEndDate: new Date(Date.UTC(2026, 1, 5)) },
  { id: 48, firstName: "barbare", lastName: "jikia", email: "barbare.jikia@gmail.com", phoneNumber: "579445566", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 6, 12)), subscriptionEndDate: new Date(Date.UTC(2026, 6, 12)) },
  { id: 49, firstName: "ilia", lastName: "chavchavadze", email: "ilia.chavcha@gmail.com", phoneNumber: "591889900", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 4, 23)), subscriptionEndDate: new Date(Date.UTC(2026, 4, 23)) },
  { id: 50, firstName: "medea", lastName: "jishkariani", email: "medea.jishkariani@gmail.com", phoneNumber: "555112233", gender: 2, subscriptionStartDate: new Date(Date.UTC(2024, 9, 7)), subscriptionEndDate: new Date(Date.UTC(2025, 9, 7)) },
  { id: 51, firstName: "vakhtang", lastName: "gorgasali", email: "vakhtang.gorgasali@gmail.com", phoneNumber: "599334455", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 7, 15)), subscriptionEndDate: new Date(Date.UTC(2026, 7, 15)) },
  { id: 52, firstName: "tina", lastName: "kandelaki", email: "tina.kandelaki@yahoo.com", phoneNumber: "577556677", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 0, 21)), subscriptionEndDate: new Date(Date.UTC(2026, 0, 21)) },
  { id: 53, firstName: "nugzar", lastName: "bagrationi", email: "nugzar.bagrationi@gmail.com", phoneNumber: "598778899", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 3, 29)), subscriptionEndDate: new Date(Date.UTC(2026, 3, 29)) },
  { id: 54, firstName: "guranda", lastName: "gvaladze", email: "guranda.gvaladze@gmail.com", phoneNumber: "551001122", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 9, 19)), subscriptionEndDate: new Date(Date.UTC(2026, 9, 19)) },
  { id: 55, firstName: "otari", lastName: "megrelidze", email: "otari.megrelidze@gmail.com", phoneNumber: "595223344", gender: 1, subscriptionStartDate: new Date(Date.UTC(2024, 11, 9)), subscriptionEndDate: new Date(Date.UTC(2025, 11, 9)) },
  { id: 56, firstName: "lali", lastName: "badurashvili", email: "lali.badurashvili@gmail.com", phoneNumber: "579667788", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 5, 3)), subscriptionEndDate: new Date(Date.UTC(2026, 5, 3)) },
  { id: 57, firstName: "beso", lastName: "kaladze", email: "beso.kaladze@gmail.com", phoneNumber: "591445566", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 2, 25)), subscriptionEndDate: new Date(Date.UTC(2026, 2, 25)) },
  { id: 58, firstName: "natia", lastName: "todua", email: "natia.todua@gmail.com", phoneNumber: "555889900", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 8, 7)), subscriptionEndDate: new Date(Date.UTC(2026, 8, 7)) },
  { id: 59, firstName: "ramaz", lastName: "chkhikvadze", email: "ramaz.chkhikvadze@outlook.com", phoneNumber: "599990011", gender: 1, subscriptionStartDate: new Date(Date.UTC(2024, 10, 2)), subscriptionEndDate: new Date(Date.UTC(2025, 10, 2)) },
  { id: 60, firstName: "ekaterina", lastName: "dadiani", email: "ekaterina.dadiani@gmail.com", phoneNumber: "577112233", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 1, 11)), subscriptionEndDate: new Date(Date.UTC(2026, 1, 11)) },
  { id: 61, firstName: "akaki", lastName: "tsereteli", email: "akaki.tsereteli@gmail.com", phoneNumber: "598334455", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 6, 4)), subscriptionEndDate: new Date(Date.UTC(2026, 6, 4)) },
  { id: 62, firstName: "olga", lastName: "guruli", email: "olga.guruli@gmail.com", phoneNumber: "551556677", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 4, 18)), subscriptionEndDate: new Date(Date.UTC(2026, 4, 18)) },
  { id: 63, firstName: "lela", lastName: "tsurtsumia", email: "lela.tsurtsumia@gmail.com", phoneNumber: "595778899", gender: 2, subscriptionStartDate: new Date(Date.UTC(2024, 9, 25)), subscriptionEndDate: new Date(Date.UTC(2025, 9, 25)) },
  { id: 64, firstName: "misha", lastName: "saakashvili", email: "misha.saak@gmail.com", phoneNumber: "579001122", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 7, 29)), subscriptionEndDate: new Date(Date.UTC(2026, 7, 29)) },
  { id: 65, firstName: "sandro", lastName: "gogoladze", email: "sandro.gogo@gmail.com", phoneNumber: "591223344", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 0, 3)), subscriptionEndDate: new Date(Date.UTC(2026, 0, 3)) },
  { id: 66, firstName: "nino", lastName: "katamadze", email: "nino.katamadze@gmail.com", phoneNumber: "555445566", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 10, 26)), subscriptionEndDate: new Date(Date.UTC(2026, 10, 26)) },
  { id: 67, firstName: "guram", lastName: "dochanashvili", email: "guram.docha@gmail.com", phoneNumber: "599667788", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 3, 5)), subscriptionEndDate: new Date(Date.UTC(2026, 3, 5)) },
  { id: 68, firstName: "irina", lastName: "imerlishvili", email: "irina.imerli@gmail.com", phoneNumber: "577889900", gender: 2, subscriptionStartDate: new Date(Date.UTC(2024, 11, 17)), subscriptionEndDate: new Date(Date.UTC(2025, 11, 17)) },
  { id: 69, firstName: "nodo", lastName: "gagoshidze", email: "nodo.gagoshidze@gmail.com", phoneNumber: "598990011", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 5, 13)), subscriptionEndDate: new Date(Date.UTC(2026, 5, 13)) },
  { id: 70, firstName: "anano", lastName: "mdivani", email: "anano.mdivani@yahoo.com", phoneNumber: "551112233", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 2, 30)), subscriptionEndDate: new Date(Date.UTC(2026, 2, 30)) },
  { id: 71, firstName: "buba", lastName: "kikabidze", email: "buba.kikabidze@gmail.com", phoneNumber: "595334455", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 8, 28)), subscriptionEndDate: new Date(Date.UTC(2026, 8, 28)) },
  { id: 72, firstName: "keti", lastName: "topuria", email: "keti.topuria@gmail.com", phoneNumber: "579556677", gender: 2, subscriptionStartDate: new Date(Date.UTC(2024, 10, 23)), subscriptionEndDate: new Date(Date.UTC(2025, 10, 23)) },
  { id: 73, firstName: "temo", lastName: "chrelashvili", email: "temo.chrela@gmail.com", phoneNumber: "591778899", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 1, 20)), subscriptionEndDate: new Date(Date.UTC(2026, 1, 20)) },
  { id: 74, firstName: "lika", lastName: "kavjaradze", email: "lika.kavjaradze@gmail.com", phoneNumber: "555001122", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 6, 8)), subscriptionEndDate: new Date(Date.UTC(2026, 6, 8)) },
  { id: 75, firstName: "revaz", lastName: "laghidze", email: "revaz.laghidze@gmail.com", phoneNumber: "599223344", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 4, 5)), subscriptionEndDate: new Date(Date.UTC(2026, 4, 5)) },
  { id: 76, firstName: "mariam", lastName: "lordkipanidze", email: "mariam.lordki@gmail.com", phoneNumber: "577445566", gender: 2, subscriptionStartDate: new Date(Date.UTC(2024, 9, 14)), subscriptionEndDate: new Date(Date.UTC(2025, 9, 14)) },
  { id: 77, firstName: "zaza", lastName: "pachulia", email: "zaza.pachulia@gmail.com", phoneNumber: "598667788", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 7, 18)), subscriptionEndDate: new Date(Date.UTC(2026, 7, 18)) },
  { id: 78, firstName: "salome", lastName: "zurabishvili", email: "salome.zura@gmail.com", phoneNumber: "551889900", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 0, 12)), subscriptionEndDate: new Date(Date.UTC(2026, 0, 12)) },
  { id: 79, firstName: "kakha", lastName: "kaladze", email: "kakha.kaladze@gmail.com", phoneNumber: "595990011", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 3, 24)), subscriptionEndDate: new Date(Date.UTC(2026, 3, 24)) },
  { id: 80, firstName: "nino", lastName: "burjanadze", email: "nino.burja@gmail.com", phoneNumber: "579112233", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 9, 11)), subscriptionEndDate: new Date(Date.UTC(2026, 9, 11)) },
  { id: 81, firstName: "bidzina", lastName: "ivanishvili", email: "bidzina.ivani@gmail.com", phoneNumber: "591334455", gender: 1, subscriptionStartDate: new Date(Date.UTC(2024, 11, 4)), subscriptionEndDate: new Date(Date.UTC(2025, 11, 4)) },
  { id: 82, firstName: "tina", lastName: "khidasheli", email: "tina.khidasheli@gmail.com", phoneNumber: "555556677", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 5, 18)), subscriptionEndDate: new Date(Date.UTC(2026, 5, 18)) },
  { id: 83, firstName: "gela", lastName: "charkviani", email: "gela.charkviani@gmail.com", phoneNumber: "599778899", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 2, 16)), subscriptionEndDate: new Date(Date.UTC(2026, 2, 16)) },
  { id: 84, firstName: "ana", lastName: "dolidze", email: "ana.dolidze@yahoo.com", phoneNumber: "577001122", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 8, 1)), subscriptionEndDate: new Date(Date.UTC(2026, 8, 1)) },
  { id: 85, firstName: "irakli", lastName: "garibashvili", email: "irakli.gariba@gmail.com", phoneNumber: "598223344", gender: 1, subscriptionStartDate: new Date(Date.UTC(2024, 10, 19)), subscriptionEndDate: new Date(Date.UTC(2025, 10, 19)) },
  { id: 86, firstName: "ekaterine", lastName: "tikaradze", email: "ekaterine.tika@gmail.com", phoneNumber: "551445566", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 1, 26)), subscriptionEndDate: new Date(Date.UTC(2026, 1, 26)) },
  { id: 87, firstName: "giorgi", lastName: "kvirikashvili", email: "giorgi.kviri@gmail.com", phoneNumber: "595667788", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 6, 21)), subscriptionEndDate: new Date(Date.UTC(2026, 6, 21)) },
  { id: 88, firstName: "maia", lastName: "panjikidze", email: "maia.panjikidze@gmail.com", phoneNumber: "579889900", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 4, 27)), subscriptionEndDate: new Date(Date.UTC(2026, 4, 27)) },
  { id: 89, firstName: "vladimer", lastName: "gurgenidze", email: "vladimer.gurgen@gmail.com", phoneNumber: "591990011", gender: 1, subscriptionStartDate: new Date(Date.UTC(2024, 9, 9)), subscriptionEndDate: new Date(Date.UTC(2025, 9, 9)) },
  { id: 90, firstName: "lika", lastName: "gomiashvili", email: "lika.gomiashvili@gmail.com", phoneNumber: "555112233", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 7, 24)), subscriptionEndDate: new Date(Date.UTC(2026, 7, 24)) },
  { id: 91, firstName: "nika", lastName: "gvaramia", email: "nika.gvaramia@gmail.com", phoneNumber: "599334455", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 0, 18)), subscriptionEndDate: new Date(Date.UTC(2026, 0, 18)) },
  { id: 92, firstName: "sofio", lastName: "khuntsaria", email: "sofio.khuntsaria@gmail.com", phoneNumber: "577556677", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 10, 14)), subscriptionEndDate: new Date(Date.UTC(2026, 10, 14)) },
  { id: 93, firstName: "aleko", lastName: "elisashvili", email: "aleko.elisa@gmail.com", phoneNumber: "598778899", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 3, 8)), subscriptionEndDate: new Date(Date.UTC(2026, 3, 8)) },
  { id: 94, firstName: "eliso", lastName: "bolkvadze", email: "eliso.bolkvadze@gmail.com", phoneNumber: "551001122", gender: 2, subscriptionStartDate: new Date(Date.UTC(2024, 11, 31)), subscriptionEndDate: new Date(Date.UTC(2025, 11, 31)) },
  { id: 95, firstName: "zviad", lastName: "dzidziguri", email: "zviad.dzidzi@gmail.com", phoneNumber: "595223344", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 5, 29)), subscriptionEndDate: new Date(Date.UTC(2026, 5, 29)) },
  { id: 96, firstName: "nino", lastName: "lomjaria", email: "nino.lomjaria@gmail.com", phoneNumber: "579445566", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 2, 4)), subscriptionEndDate: new Date(Date.UTC(2026, 2, 4)) },
  { id: 97, firstName: "davit", lastName: "usupashvili", email: "davit.usupa@gmail.com", phoneNumber: "591667788", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 8, 16)), subscriptionEndDate: new Date(Date.UTC(2026, 8, 16)) },
  { id: 98, firstName: "tamar", lastName: "chugoshvili", email: "tamar.chugo@gmail.com", phoneNumber: "555889900", gender: 2, subscriptionStartDate: new Date(Date.UTC(2024, 10, 5)), subscriptionEndDate: new Date(Date.UTC(2025, 10, 5)) },
  { id: 99, firstName: "irakli", lastName: "kobakhidze", email: "irakli.kobakhidze@gmail.com", phoneNumber: "599990011", gender: 1, subscriptionStartDate: new Date(Date.UTC(2025, 1, 9)), subscriptionEndDate: new Date(Date.UTC(2026, 1, 9)) },
  { id: 100, firstName: "ekaterine", lastName: "khvedelidze", email: "ekaterine.khvede@gmail.com", phoneNumber: "577112233", gender: 2, subscriptionStartDate: new Date(Date.UTC(2025, 6, 15)), subscriptionEndDate: new Date(Date.UTC(2026, 6, 15)) }
];

  getAllUsers({page,take,gender,email}:UserQueryDto) {
    const query =this.users.filter(user =>
    (gender === undefined || user.gender === gender) &&
    (email === undefined || user.email.toLowerCase().startsWith(email.toLowerCase())))

    const start = (page-1)*take
    const end= page* take
    return query.slice(start,end);
  }

  createUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    gender
  }): CreateUserDto {
    if (!firstName || !lastName || !email )
      throw new HttpException(
        'firstName, lastName and email is required',
        HttpStatus.BAD_REQUEST,
      );
    const lastId = this.users[this.users.length - 1]?.id || 0;
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1)
    const newUser = {
      id: lastId + 1,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      gender: gender,
      subscriptionStartDate: startDate,
      subscriptionEndDate:endDate
    };
    this.users.push(newUser);
    return newUser;
  }

  getUserById(userId: number) {
    const user = this.users.find((o) => o.id === userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  deleteUserById(userId: number) {
    const userIndex = this.users.findIndex((o) => o.id === userId);
    if (userIndex === -1) throw new NotFoundException('User not found');
    const [deletedUser] = this.users.splice(userIndex, 1);
    return deletedUser;
  }

  updateUserById(userId: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((o) => o.id === userId);
    if (userIndex === -1) throw new NotFoundException('User not found');
    const updateReq = {};
    if (updateUserDto.firstName) updateReq['firstName'] = updateUserDto.firstName;
    if (updateUserDto.lastName) updateReq['lastName'] = updateUserDto.lastName;
    if (updateUserDto.email) updateReq['email'] = updateUserDto.email;
    if (updateUserDto.phoneNumber) updateReq['phoneNumber'] = updateUserDto.phoneNumber;
    if (updateUserDto.gender) updateReq['gender'] = updateUserDto.gender;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateReq,
    };

    return this.users[userIndex];
  }

   upgradeSubscription(id: number):boolean {
       const userIndex = this.users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    throw new NotFoundException('User not found');
  }

  const user = this.users[userIndex];
  const now = new Date();

  if (user.subscriptionStartDate && user.subscriptionEndDate) {
    if (now >= user.subscriptionStartDate && now <= user.subscriptionEndDate) {
      throw new HttpException('user has subscription', HttpStatus.BAD_REQUEST);
    }
  }
  else
    throw new HttpException('user cannot continue subscription', HttpStatus.BAD_REQUEST);
  
  console.log(user)
  const subscriptionStartDate = new Date();
  const subscriptionEndDate = new Date(subscriptionStartDate);
  subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

  this.users[userIndex] = {
    ...user,
    subscriptionStartDate,
    subscriptionEndDate,
  };
  return true


  }
}
