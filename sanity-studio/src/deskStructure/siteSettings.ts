/**
 * This file is part of the isnackable.me project.
 * Copyright © 2021-2022 isnackable.me. All rights reserved.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import S from "@sanity/desk-tool/structure-builder";
import { IoMdSettings } from "react-icons/io";

export default S.documentListItem()
  .title("Site settings")
  .icon(IoMdSettings)
  .schemaType("siteSettings")
  .child(
    S.editor()
      .title("Site settings")
      .id("siteSettings")
      .schemaType("siteSettings")
      .documentId("siteSettings")
  );
