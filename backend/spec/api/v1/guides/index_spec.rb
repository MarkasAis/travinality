require 'rails_helper'

RSpec.describe "guides#index", type: :request do
  let(:params) { {} }

  subject(:make_request) do
    jsonapi_get "/api/v1/guides", params: params
  end

  describe 'basic fetch' do
    let!(:guide1) { create(:guide) }
    let!(:guide2) { create(:guide) }

    it 'works' do
      expect(GuideResource).to receive(:all).and_call_original
      make_request
      expect(response.status).to eq(200), response.body
      expect(d.map(&:jsonapi_type).uniq).to match_array(['guides'])
      expect(d.map(&:id)).to match_array([guide1.id, guide2.id])
    end
  end
end
